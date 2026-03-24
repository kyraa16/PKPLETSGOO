import { sseClients } from "@/lib/sse";

export const dynamic = "force-dynamic";

const encoder = new TextEncoder();

export async function GET() {
  let controller: ReadableStreamDefaultController<Uint8Array>;

  const stream = new ReadableStream<Uint8Array>({
    start(c) {
      controller = c;
      sseClients.add(controller);
      // Initial keepalive so the browser confirms the connection
      controller.enqueue(encoder.encode(": keepalive\n\n"));
    },
    cancel() {
      sseClients.delete(controller);
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
