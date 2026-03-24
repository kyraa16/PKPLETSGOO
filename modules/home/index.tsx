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
              <Image
                src="/hengker-black.png"
                alt="hengker"
                fill
                sizes="default"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Biodata Kelompok
            </h1>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              PKPLETSGOO
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Jelajahi profil dan kenali lebih dekat orang-orang di balik
              kelompok kami.
            </p>
          </div>

          <div className="max-w-6xl flex flex-wrap items-center justify-center gap-6">
            {groupMembers.map((member) => (
              <BiodataCard key={member.id} data={member} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomeModule;
