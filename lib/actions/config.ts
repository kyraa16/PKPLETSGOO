"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { broadcast } from "@/lib/sse";
import type { Theme, ColorTheme, FontTheme } from "@/components/elements/ThemeProvider";

export async function getConfig() {
  return prisma.config.upsert({
    where: { id: "global" },
    create: { id: "global" },
    update: {},
  });
}

export async function updateConfig(data: {
  theme?: Theme;
  colorTheme?: ColorTheme;
  fontTheme?: FontTheme;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    throw new Error("Unauthorized: not logged in.");
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { canEditTheme: true, name: true },
  });
  if (!user?.canEditTheme) {
    throw new Error("Unauthorized: you do not have permission to edit the theme.");
  }
  const payload = { ...data, lastChangedByName: user.name };
  const config = await prisma.config.upsert({
    where: { id: "global" },
    create: { id: "global", ...payload },
    update: payload,
  });
  broadcast({
    theme: config.theme,
    colorTheme: config.colorTheme,
    fontTheme: config.fontTheme,
    lastChangedByName: config.lastChangedByName,
    updatedAt: config.updatedAt.toISOString(),
  });
  return config;
}
