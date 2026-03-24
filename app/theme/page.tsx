import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ThemeModule from "@/modules/theme";


export const metadata = {
  title: "Appearance · PKPLETSGOO",
};


export default async function ThemePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) redirect("/");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { canEditTheme: true },
  });
  if (!user?.canEditTheme) redirect("/");

  return <ThemeModule />;
}
