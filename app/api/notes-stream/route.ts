import { notesChannel } from "@/lib/sse";

export const dynamic = "force-dynamic";

const encoder = new TextEncoder();

export async function GET() {
  let controller: ReadableStreamDefaultController<Uint8Array>;

  const stream = new ReadableStream<Uint8Array>({
    start(c) {
      controller = c;
      notesChannel.clients.add(controller);
      controller.enqueue(encoder.encode(": keepalive\n\n"));
    },
    cancel() {
      notesChannel.clients.delete(controller);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
