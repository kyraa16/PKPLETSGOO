import { authClient } from "@/lib/auth-client";

export async function signInWithGithub() {
  await authClient.signIn.social({ provider: "github" });
}
