type Controller = ReadableStreamDefaultController<Uint8Array>;

const globalForSSE = globalThis as unknown as { sseClients: Set<Controller> };
if (!globalForSSE.sseClients) globalForSSE.sseClients = new Set();

export const sseClients = globalForSSE.sseClients;

const encoder = new TextEncoder();

export function broadcast(data: object) {
  const message = `data: ${JSON.stringify(data)}\n\n`;
  const encoded = encoder.encode(message);
  for (const controller of sseClients) {
    try {
      controller.enqueue(encoded);
    } catch {
      sseClients.delete(controller);
    }
  }
}
