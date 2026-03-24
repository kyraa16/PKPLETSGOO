import { Suspense } from "react";
import HomeModule from "@/modules/home";
import ThemeChangeBanner from "@/components/elements/ThemeChangeBanner";

export default function Home() {
  return (
    <HomeModule
      banner={
        <Suspense>
          <ThemeChangeBanner />
        </Suspense>
      }
    />
  );
}
