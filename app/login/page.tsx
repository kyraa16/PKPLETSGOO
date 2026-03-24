import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import LoginModule from "@/modules/login";


export default async function LoginPage() {
  const session = await auth.api.getSession({ headers: await headers() });


  if (session) {
    redirect("/");
  }


  return <LoginModule />;
}
