"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const LoginBanner = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await authClient.getSession();
        setIsLoggedIn(!!session.data?.user);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  if (isLoading || isLoggedIn) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-8 text-center space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Masuk untuk Pengaturan Lebih Lanjut!
          </h2>
          <p className="text-muted-foreground">
            Masuk untuk mengakses fitur pengaturan font dan tema.
          </p>
        </div>
        <Link href="/login">
          <Button size="lg" className="w-full sm:w-auto">
            Masuk Sekarang
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default LoginBanner;
