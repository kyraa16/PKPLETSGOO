import { authClient } from "@/lib/auth-client";

export async function logout() {
  await authClient.signOut();
}
