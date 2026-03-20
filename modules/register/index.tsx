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

      <div className="text-red-500">Register Page ygy</div>
    </main>
  );
};

export default RegisterModule;
