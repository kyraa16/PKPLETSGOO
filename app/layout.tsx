import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Geist,
  Poppins,
  Nunito,
  Roboto,
} from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/elements/Navbar";
import ThemeProvider from "@/components/elements/ThemeProvider";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "PKPLETSGOO",
  description: "Satu PKPLETSGOO untuk semua",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers() });
  const canEditTheme = session?.user
    ? await prisma.user
        .findUnique({
          where: { id: session.user.id },
          select: { canEditTheme: true },
        })
        .then((u: { canEditTheme: boolean } | null) => u?.canEditTheme ?? false)
    : false;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        plusJakartaSans.variable,
        geist.variable,
        poppins.variable,
        nunito.variable,
        roboto.variable,
      )}
    >
      {/* Inline script runs synchronously before first paint — prevents FOUC */}
      <head>
        <template
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'system';if(t==='system'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark')document.documentElement.classList.add('dark');var c=localStorage.getItem('color-theme');if(c&&c!=='default')document.documentElement.classList.add('theme-'+c);var f=localStorage.getItem('font-theme');if(f&&f!=='default')document.documentElement.classList.add('font-'+f);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider canEditTheme={canEditTheme}>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
