import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import SessionCard from "./components/SessionCard";
import { Biodata, BiodataCard } from "@/components/elements/BiodataCard";

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

const HomeModule = () => {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center gap-8 px-6 md:px-20">
      {/* HEADER */}
      <div className="flex items-center gap-2">
        <div className="relative size-12">
          <Image src="/hengker-black.png" alt="hengker" fill sizes="default" />
        </div>
        <div className="text-3xl font-bold">PKPLETSGOO</div>
      </div>

      {/* MAIN */}
      <section className="flex flex-col items-center">
        <h1 className="text-red-500">Nanti biodata di sini ygy</h1>
        <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Biodata Kelompok</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mengenal lebih dekat anggota kelompok kami. Silakan login untuk melihat informasi tambahan dan melakukan perubahan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 place-items-center">
          {groupMembers.map((member) => (
            <BiodataCard key={member.id} data={member} />
          ))}
        </div>
      </div>
      </section>

      {/* SESSION CARD */}
      <SessionCard />

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
};

export default HomeModule;
