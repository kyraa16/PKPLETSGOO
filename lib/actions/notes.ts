"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notesChannel } from "@/lib/sse";

export async function getNotes() {
  return prisma.note.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createNote(data: { content: string; color: string }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Unauthorized: not logged in.");

  const note = await prisma.note.create({
    data: {
      content: data.content,
      color: data.color,
      authorId: session.user.id,
      authorName: session.user.name,
    },
  });

  notesChannel.push({
    type: "create",
    note: { ...note, createdAt: note.createdAt.toISOString() },
  });

  return note;
}

export async function deleteNote(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Unauthorized: not logged in.");

  const note = await prisma.note.findUnique({ where: { id } });
  if (!note) throw new Error("Note not found.");
  if (note.authorId !== session.user.id) throw new Error("Unauthorized.");

  await prisma.note.delete({ where: { id } });

  notesChannel.push({ type: "delete", id });
}
