"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Biodata, BiodataCard } from "@/components/elements/BiodataCard";
import { createAuthClient } from "better-auth/react";

// Data hardcoded anggota kelompok
const groupMembers: Biodata[] = [
  {
    id: "1",
    namaLengkap: "Kadek Chandra Rasmi",
    ttl: "Bekasi, 16 May 2005",
    alamat: "Planet Bekasi",
    jurusan: "Ilmu Komputer",
  },
  {
    id: "2",
    namaLengkap: "Muhamad Hakim Nizami",
    ttl: "Jakarta, 15 Februari 2000an",
    alamat: "Cibubur",
    jurusan: "Ilmu Komputer",
  },
  {
    id: "3",
    namaLengkap: "Muhammad Helmi Alfarissi",
    ttl: "Jakarta, 15 Februari 2000an",
    alamat: "Jakarta",
    jurusan: "Sistem Informasi",
  },
  {
    id: "4",
    namaLengkap: "Nazwa Zahra Sausan",
    ttl: "Jakarta, 15 Februari 2000an",
    alamat: "Cibubur",
    jurusan: "Sistem Informasi",
  },
  {
    id: "5",
    namaLengkap: "Syakirah Zahra Dhawini",
    ttl: "Jakarta, 15 Februari 2000an",
    alamat: "Bekasi",
    jurusan: "Sistem Informasi",
  },
];

const { useSession } = createAuthClient();

const HomeModule = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center gap-8 px-6 py-24 md:px-20">
      

      {/* MAIN */}
      <section className="flex flex-col items-center">
        <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="relative size-12 align-middle mx-auto">
            <Image src="/hengker-black.png" alt="hengker" fill sizes="default" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Biodata Kelompok</h1>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">PKPLETSGOO</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jelajahi profil dan kenali lebih dekat orang-orang di balik kelompok kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 place-items-center">
          {groupMembers.map((member) => (
            <BiodataCard key={member.id} data={member} />
          ))}
        </div>
      </div>
      </section>

      {/* CTA BANNER */}
      {!session && (
        <section className="w-full max-w-4xl bg-muted/40 border border-border rounded-4xl p-8 md:text-center flex flex-col items-center gap-6 shadow-sm">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Tertarik untuk bergabung?</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
              Daftarkan dirimu sekarang untuk mendapatkan akses penuh pengaturan tema dan font.
            </p>
          </div>
          <Link href="/register">
            <Button size="lg" className="w-full sm:w-auto px-10 h-12 text-base font-semibold">
              Daftar Sekarang
            </Button>
          </Link>
        </section>
      )}

      {/* SESSION CARD */}
      {/* <SessionCard /> */}

      {/* TEMPORARY NAVIGATION */}
      {/* <section className="flex flex-col items-center gap-2">
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
      </section> */}
    </main>
  );
};

export default HomeModule;
