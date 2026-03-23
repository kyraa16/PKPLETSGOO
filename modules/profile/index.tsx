"use client";

import SessionCard from "@/components/elements/SessionCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, Loader2 } from "lucide-react";
import Link from "next/link";
import { createAuthClient } from "better-auth/react";

const { useSession } = createAuthClient();

const ProfileModule = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
        <AlertTriangle className="h-16 w-16 text-destructive mb-2" />
        <h1 className="text-3xl font-bold text-center">Akses Ditolak</h1>
        <p className="text-muted-foreground text-center max-w-md mb-4">
          Login terlebih dahulu untuk mengakses.
        </p>
        <div className="flex gap-4">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
          <Link href="/login">
            <Button>Login Sekarang</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center gap-8 px-6 md:px-20 py-16">
      {/* BACK BUTTON */}
      <Link href="/">
        <Button variant="link" className="absolute left-6 md:left-20 top-26">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>

      <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Your Account</h1>
          <p className="text-muted-foreground">Kelola informasi akun Anda di sini.</p>
        </div>
        
        <SessionCard />
      </div>
    </main>
  );
};

export default ProfileModule;