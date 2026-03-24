import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { Paintbrush } from "lucide-react";

export default async function ThemeChangeBanner() {
  const config = await prisma.config.findUnique({
    where: { id: "global" },
    select: { lastChangedByName: true, updatedAt: true },
  });

  if (!config?.lastChangedByName) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground border rounded-lg px-4 py-2.5 bg-muted/50 w-fit mx-auto">
      <Paintbrush className="size-4 shrink-0" />
      <span>
        Theme last updated by{" "}
        <span className="font-medium text-foreground">
          {config.lastChangedByName}
        </span>{" "}
        &mdash; {formatDistanceToNow(config.updatedAt, { addSuffix: true })}
      </span>
    </div>
  );
}
