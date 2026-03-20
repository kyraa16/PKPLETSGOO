import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed inset-0 flex items-center justify-between h-14 md:h-20 z-9999 px-6 md:px-20">
      {/* LOGO */}
      <Link href="/">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <div className="relative size-9 md:size-12">
            <Image src="/hengker-black.png" alt="hengker" fill />
          </div>
          <span className="max-md:hidden">PKPLETSGOO</span>
        </div>
      </Link>

      {/* LOGIN BUTTON */}
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </nav>
  );
};

export default Navbar;
