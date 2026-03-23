"use client";

import { Button } from "@/components/ui/button";
import { createAuthClient } from "better-auth/react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const { useSession } = createAuthClient();

const Navbar = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  return (
    <nav className="fixed inset-0 flex items-center justify-between h-14 md:h-20 z-9999 px-6 md:px-20">
      {/* LOGO */}
      <Link href="/">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <div className="relative size-9 md:size-12">
            <Image
              src="/hengker-black.png"
              alt="hengker"
              fill
              sizes="default"
            />
          </div>
          <span className="max-md:hidden">PKPLETSGOO</span>
        </div>
      </Link>

      {/* AUTHENTICATION */}
      <div className="flex items-center gap-4">
        {isPending ? (
          <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
        ) : session ? (
          <Link href="/profile">
            <div className="relative size-10 rounded-full overflow-hidden md:size-12">
              <Image
                src={user?.image as string}
                alt="hengker"
                fill
                sizes="default"
                loading="eager"
              />
            </div>
          </Link>
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
