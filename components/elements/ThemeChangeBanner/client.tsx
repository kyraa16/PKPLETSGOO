"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Paintbrush } from "lucide-react";

type Props = {
  initialName: string | null;
  initialUpdatedAt: string | null;
};

export default function ThemeChangeBannerClient({ initialName, initialUpdatedAt }: Props) {
  const [name, setName] = useState(initialName);
  const [updatedAt, setUpdatedAt] = useState(initialUpdatedAt);

  useEffect(() => {
    const es = new EventSource("/api/theme-stream");
    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as {
          lastChangedByName?: string;
          updatedAt?: string;
        };
        if (data.lastChangedByName) setName(data.lastChangedByName);
        if (data.updatedAt) setUpdatedAt(data.updatedAt);
      } catch {
        // malformed event — ignore
      }
    };
    return () => es.close();
  }, []);

  if (!name || !updatedAt) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground border rounded-lg px-4 py-2.5 bg-muted/50 w-fit mx-auto">
      <Paintbrush className="size-4 shrink-0" />
      <span>
        Theme last updated by{" "}
        <span className="font-medium text-foreground">{name}</span>{" "}
        &mdash; {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
      </span>
    </div>
  );
}
