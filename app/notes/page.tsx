import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getNotes } from "@/lib/actions/notes";
import NotesModule from "@/modules/notes";

export const metadata = {
  title: "Sticky Notes · PKPLETSGOO",
};

export default async function NotesPage() {
  const [session, notes] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    getNotes(),
  ]);

  const initialNotes = notes.map((n) => ({
    ...n,
    createdAt: n.createdAt.toISOString(),
  }));

  return (
    <NotesModule
      initialNotes={initialNotes}
      currentUserId={session?.user?.id ?? null}
    />
  );
}
