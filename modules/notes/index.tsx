"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { createAuthClient } from "better-auth/react";
import { formatDistanceToNow } from "date-fns";
import { Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createNote, deleteNote } from "@/lib/actions/notes";
import { cn } from "@/lib/utils";

const { useSession } = createAuthClient();

// ── Types ──────────────────────────────────────────────────────

type NoteData = {
  id: string;
  content: string;
  color: string;
  authorId: string;
  authorName: string;
  createdAt: string;
};

// ── Constants ─────────────────────────────────────────────────

const COLORS = [
  { value: "yellow", bg: "bg-yellow-200", border: "border-yellow-300", ring: "ring-yellow-400" },
  { value: "pink",   bg: "bg-pink-200",   border: "border-pink-300",   ring: "ring-pink-400" },
  { value: "blue",   bg: "bg-blue-200",   border: "border-blue-300",   ring: "ring-blue-400" },
  { value: "green",  bg: "bg-green-200",  border: "border-green-300",  ring: "ring-green-400" },
  { value: "purple", bg: "bg-purple-200", border: "border-purple-300", ring: "ring-purple-400" },
  { value: "orange", bg: "bg-orange-200", border: "border-orange-300", ring: "ring-orange-400" },
] as const;

const ROTATIONS = [-3, -2, -1, 0, 1, 2, 3];

function getNoteStyle(id: string) {
  const code = id.charCodeAt(id.length - 1);
  const deg = ROTATIONS[code % ROTATIONS.length];
  return { transform: `rotate(${deg}deg)` };
}

function getColorClasses(color: string) {
  return COLORS.find((c) => c.value === color) ?? COLORS[0];
}

// ── Component ─────────────────────────────────────────────────

type Props = {
  initialNotes: NoteData[];
  currentUserId: string | null;
};

export default function NotesModule({ initialNotes, currentUserId }: Props) {
  const { data: session } = useSession();
  const userId = currentUserId ?? session?.user?.id ?? null;

  const [notes, setNotes] = useState<NoteData[]>(initialNotes);
  const [content, setContent] = useState("");
  const [color, setColor] = useState("yellow");
  const [isPending, startTransition] = useTransition();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Real-time updates via SSE
  useEffect(() => {
    const es = new EventSource("/api/notes-stream");
    es.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data) as
          | { type: "create"; note: NoteData }
          | { type: "delete"; id: string };

        if (msg.type === "create") {
          setNotes((prev) =>
            prev.some((n) => n.id === msg.note.id)
              ? prev
              : [msg.note, ...prev],
          );
        } else if (msg.type === "delete") {
          setNotes((prev) => prev.filter((n) => n.id !== msg.id));
        }
      } catch {
        // malformed event — ignore
      }
    };
    return () => es.close();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;

    startTransition(async () => {
      await createNote({ content: trimmed, color });
      setContent("");
      textareaRef.current?.focus();
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteNote(id);
    });
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-6 md:px-20">
      {/* BACK */}
      <Link href="/">
        <Button variant="link" className="absolute left-6 md:left-20 top-26">
          <ArrowLeft />
          Back to Landing
        </Button>
      </Link>

      <div className="max-w-5xl mx-auto space-y-10 pt-12">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sticky Notes</h1>
          <p className="text-muted-foreground mt-1">
            Leave a note for everyone to see. Updates in real time.
          </p>
        </div>

        {/* Compose form — only for logged-in users */}
        {session ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-xl border bg-card p-5 shadow-sm"
          >
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note…"
              rows={3}
              maxLength={280}
              className="w-full resize-none rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {/* Color picker */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Color</span>
              <div className="flex gap-1.5">
                {COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setColor(c.value)}
                    className={cn(
                      "size-6 rounded-full border-2 transition-all",
                      c.bg,
                      color === c.value
                        ? "border-foreground scale-110"
                        : "border-transparent hover:border-foreground/40",
                    )}
                  />
                ))}
              </div>

              <Button
                type="submit"
                size="sm"
                disabled={isPending || !content.trim()}
                className="ml-auto"
              >
                Post
              </Button>
            </div>
          </form>
        ) : (
          <div className="rounded-xl border bg-muted/50 px-5 py-4 text-sm text-muted-foreground">
            <Link href="/login" className="font-medium text-foreground underline underline-offset-4">
              Log in
            </Link>{" "}
            to post a note.
          </div>
        )}

        {/* Notes grid */}
        {notes.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">
            No notes yet. Be the first!
          </p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {notes.map((note) => {
              const cls = getColorClasses(note.color);
              const isOwner = userId === note.authorId;
              return (
                <div
                  key={note.id}
                  style={getNoteStyle(note.id)}
                  className={cn(
                    "break-inside-avoid rounded-sm border shadow-md p-4 flex flex-col gap-3 transition-transform hover:scale-[1.02]",
                    cls.bg,
                    cls.border,
                  )}
                >
                  {/* Tape strip */}
                  <div className="w-10 h-2 rounded-full bg-white/60 mx-auto -mt-6 mb-1 shadow-sm" />

                  <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {note.content}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-black/10">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-gray-700">
                        {note.authorName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    {isOwner && (
                      <button
                        onClick={() => handleDelete(note.id)}
                        disabled={isPending}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Delete note"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
