import GithubOAuthButton from "@/components/elements/GithubOAuthButton";
import GoogleOAuthButton from "@/components/elements/GoogleOAuthButton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const RegisterModule = () => {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center gap-8 px-6 md:px-20">
      {/* BACK BUTTON */}
      <Link href="/">
        <Button variant="link" className="absolute left-6 md:left-20 top-26">
          <ArrowLeft />
          Back to Landing
        </Button>
      </Link>

      <div className="flex flex-col items-center gap-4 w-full max-w-sm border p-8 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <div className="flex flex-col gap-3 w-full">
          <GoogleOAuthButton />
          <GithubOAuthButton />
        </div>
      </div>
    </main>
  );
};

export default RegisterModule;
