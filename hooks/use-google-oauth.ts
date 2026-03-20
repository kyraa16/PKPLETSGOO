import { authClient } from "@/lib/auth-client";

export async function signInWithGoogle() {
  await authClient.signIn.social({ provider: "google" });
}
