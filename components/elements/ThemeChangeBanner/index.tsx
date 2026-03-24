import { prisma } from "@/lib/prisma";
import ThemeChangeBannerClient from "./client";

export default async function ThemeChangeBanner() {
  const config = await prisma.config.findUnique({
    where: { id: "global" },
    select: { lastChangedByName: true, updatedAt: true },
  });

  return (
    <ThemeChangeBannerClient
      initialName={config?.lastChangedByName ?? null}
      initialUpdatedAt={config?.updatedAt.toISOString() ?? null}
    />
  );
}
