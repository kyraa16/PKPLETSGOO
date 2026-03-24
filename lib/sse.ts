type Controller = ReadableStreamDefaultController<Uint8Array>;

const encoder = new TextEncoder();

function makeChannel(key: string) {
  const g = globalThis as unknown as Record<string, Set<Controller>>;
  if (!g[key]) g[key] = new Set();
  const clients = g[key];

  function push(data: object) {
    const encoded = encoder.encode(`data: ${JSON.stringify(data)}\n\n`);
    for (const controller of clients) {
      try {
        controller.enqueue(encoded);
      } catch {
        clients.delete(controller);
      }
    }
  }

  return { clients, push };
}

export const themeChannel = makeChannel("sseThemeClients");
export const notesChannel = makeChannel("sseNotesClients");

/** @deprecated use themeChannel.push */
export const sseClients = themeChannel.clients;
export function broadcast(data: object) { themeChannel.push(data); }
