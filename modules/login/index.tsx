import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import GoogleOAuthButton from "@/components/elements/GoogleOAuthButton";
import GithubOAuthButton from "@/components/elements/GithubOAuthButton";
import { Card, CardContent } from "@/components/ui/card";

const LoginModule = () => {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center gap-8 px-6 md:px-20">
      {/* BACK BUTTON */}
      <Link href="/">
        <Button variant="link" className="absolute left-6 md:left-20 top-26">
          <ArrowLeft />
          Back to Landing
        </Button>
      </Link>

      <Card className="w-full max-w-sm">
        <CardContent className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <div className="flex flex-col gap-2 w-full">
            <GoogleOAuthButton />
            <GithubOAuthButton />
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginModule;
