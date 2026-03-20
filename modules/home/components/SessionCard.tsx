"use client";

import GoogleOAuthButton from "@/components/elements/GoogleOAuthButton";
import LogoutButton from "@/components/elements/LogoutButton";
import { Card, CardContent } from "@/components/ui/card";
import { createAuthClient } from "better-auth/react";
import { Loader2 } from "lucide-react";
import Image from "next/image";

const { useSession } = createAuthClient();

const SessionCard = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (isPending) {
    return <Loader2 className="animate-spin" />;
  } else if (!session) {
    return <GoogleOAuthButton />;
  }
  return (
    <Card className="w-64">
      <CardContent className="flex flex-col items-center gap-2">
        <h1 className="text-xl font-bold text-center">Welcome</h1>

        <div className="relative size-24 rounded-full overflow-hidden">
          <Image
            src={user?.image as string}
            alt="hengker"
            fill
            sizes="default"
            loading="eager"
          />
        </div>

        <div className="w-full">
          <p>
            <strong>Nama:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Verified:</strong> {user?.emailVerified}
          </p>
        </div>

        <LogoutButton />
      </CardContent>
    </Card>
  );
};

export default SessionCard;
