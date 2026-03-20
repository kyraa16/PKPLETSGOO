import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center gap-8 px-6 md:px-20">
      {/* HEADER */}
      <div className="flex items-center gap-2">
        <div className="relative size-12">
          <Image src="/hengker-black.png" alt="hengker" fill />
        </div>
        <div className="text-3xl font-bold">PKPLETSGOO</div>
      </div>

      {/* MAIN */}
      <section className="flex flex-col items-center">
        <h1 className="text-red-500">Nanti biodata di sini ygy</h1>
      </section>

      {/* TEMPORARY NAVIGATION */}
      <section className="flex flex-col items-center gap-2">
        <h1 className="text-red-500 font-bold">Navigasi Sementara</h1>
        <div className="flex gap-2 justify-center flex-wrap w-full max-w-2xl">
          <Link href="/register">
            <Button className="w-36">Register</Button>
          </Link>
          <Link href="/login">
            <Button className="w-36">Login</Button>
          </Link>
          <Link href="/email-verification">
            <Button className="w-36">Email Verification</Button>
          </Link>
          <Link href="/forgot-password">
            <Button className="w-36">Forgot Password</Button>
          </Link>
          <Link href="/2fa">
            <Button className="w-36">2FA</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
