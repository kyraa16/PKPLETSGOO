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
import { LogOut, Loader2, Palette, User } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/elements/ThemeProvider";

const ThemeToggle = dynamic(() => import("@/components/elements/ThemeToggle"), {
  ssr: false,
});

const { useSession } = createAuthClient();

const Navbar = () => {
  const { data: session, isPending } = useSession();
  const { canEditTheme } = useTheme();
  const user = session?.user;
  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  // const displayImage = user?.image as string;
  const displayLabel = user?.name || user?.email;

  return (
    <nav className="fixed inset-x-0 top-0 flex items-center justify-between h-14 md:h-20 z-9999 px-6 md:px-20 bg-background/20 backdrop-blur-xl border-b">
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

      {/* NAVIGATIONS */}
      <div className="flex gap-2 items-center font-bold">
        <Link href="/notes" className="hover:underline">
          NOTES
        </Link>
      </div>

      {/* AUTHENTICATION */}
      <div className="flex items-center gap-4">
        {canEditTheme && (
          <>
            <Link href="/theme" aria-label="Appearance settings">
              <Palette className="size-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
            <ThemeToggle />
          </>
        )}
        {isPending ? (
          <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
        ) : session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center relative size-10 rounded-full border-2 border-black dark:border-white overflow-hidden md:size-12 focus:outline-none">
                <User />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 mt-4 md:mt-7">
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
