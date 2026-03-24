"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { createAuthClient } from "better-auth/react";
import { LogOut, Loader2, Palette } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ThemeToggle = dynamic(() => import("@/components/elements/ThemeToggle"), {
  ssr: false,
});

const { useSession } = createAuthClient();

const Navbar = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [githubAccountId, setGithubAccountId] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;
    authClient.listAccounts().then(({ data }) => {
      const github = data?.find(
        (a: { providerId: string }) => a.providerId === "github",
      );
      setGithubAccountId(
        (github as { accountId: string } | undefined)?.accountId ?? null,
      );
    });
  }, [session]);

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  const isGithub = !!githubAccountId;
  const displayImage = isGithub
    ? `https://avatars.githubusercontent.com/u/${githubAccountId}`
    : (user?.image as string);
  const displayLabel = isGithub ? user?.name : user?.email;

  return (
    <nav className="fixed inset-0 flex items-center justify-between h-14 md:h-20 z-9999 px-6 md:px-20">
      {/* LOGO */}
      <Link href="/">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <div className="relative size-9 md:size-12">
            <Image
              src="/hengker-white.png"
              alt="hengker"
              fill
              sizes="default"
              className="hidden dark:block"
            />
            <Image
              src="/hengker-black.png"
              alt="hengker"
              fill
              sizes="default"
              className="dark:hidden"
            />
          </div>
          <span className="max-md:hidden">PKPLETSGOO</span>
        </div>
      </Link>

      {/* AUTHENTICATION */}
      <div className="flex items-center gap-4">
        <Link href="/theme" aria-label="Appearance settings">
          <Palette className="size-5 text-muted-foreground hover:text-foreground transition-colors" />
        </Link>
        <ThemeToggle />
        {isPending ? (
          <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
        ) : session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative size-10 rounded-full overflow-hidden md:size-12 focus:outline-none">
                <Image
                  src={
                    !displayImage || displayImage === ""
                      ? "/hengker-white.png"
                      : displayImage
                  }
                  alt="profile"
                  fill
                  sizes="default"
                  loading="eager"
                  className="hidden dark:block"
                />
                <Image
                  src={
                    !displayImage || displayImage === ""
                      ? "/hengker-black.png"
                      : displayImage
                  }
                  alt="profile"
                  fill
                  sizes="default"
                  loading="eager"
                  className="dark:hidden"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="truncate">
                {displayLabel}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
