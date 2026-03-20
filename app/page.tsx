import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="relative size-36">
        <Image src="/hengker-white.png" alt="hengker" fill />
      </div>
    </main>
  );
}
