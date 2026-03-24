"use server";

import { prisma } from "@/lib/prisma";
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
  return prisma.config.upsert({
    where: { id: "global" },
    create: { id: "global", ...data },
    update: data,
  });
}
