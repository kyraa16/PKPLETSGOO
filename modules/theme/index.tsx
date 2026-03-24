"use client";

import {
  useTheme,
  useColorTheme,
  useFontTheme,
  type ColorTheme,
  type FontTheme,
} from "@/components/elements/ThemeProvider";
import { Monitor, Moon, Sun, Check, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const lightDarkOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

type ColorOption = {
  value: ColorTheme;
  label: string;
  light: string;
  dark: string;
};

const colorOptions: ColorOption[] = [
  {
    value: "default",
    label: "Default",
    light: "bg-zinc-900",
    dark: "bg-zinc-200",
  },
  { value: "rose", label: "Rose", light: "bg-rose-600", dark: "bg-rose-300" },
  { value: "blue", label: "Blue", light: "bg-blue-600", dark: "bg-blue-300" },
  {
    value: "green",
    label: "Green",
    light: "bg-emerald-600",
    dark: "bg-emerald-300",
  },
  {
    value: "purple",
    label: "Purple",
    light: "bg-violet-600",
    dark: "bg-violet-300",
  },
  {
    value: "orange",
    label: "Orange",
    light: "bg-orange-600",
    dark: "bg-orange-300",
  },
  { value: "cyan", label: "Cyan", light: "bg-cyan-600", dark: "bg-cyan-300" },
  {
    value: "yellow",
    label: "Yellow",
    light: "bg-yellow-500",
    dark: "bg-yellow-200",
  },
];

type FontOption = {
  value: FontTheme;
  label: string;
  /** Inline style applied to the preview text so it renders in its own face */
  previewStyle: React.CSSProperties;
  description: string;
};

const fontOptions: FontOption[] = [
  {
    value: "default",
    label: "Plus Jakarta Sans",
    previewStyle: { fontFamily: "var(--font-geist-sans)" },
    description: "Clean & modern",
  },
  {
    value: "poppins",
    label: "Poppins",
    previewStyle: { fontFamily: "var(--font-poppins)" },
    description: "Geometric & friendly",
  },
  {
    value: "nunito",
    label: "Nunito",
    previewStyle: { fontFamily: "var(--font-nunito)" },
    description: "Rounded & warm",
  },
  {
    value: "roboto",
    label: "Roboto",
    previewStyle: { fontFamily: "var(--font-roboto)" },
    description: "Neutral & versatile",
  },
  {
    value: "times",
    label: "Times New Roman",
    previewStyle: { fontFamily: '"Times New Roman", serif' },
    description: "Classic & editorial",
  },
  {
    value: "comic",
    label: "Comic Sans",
    previewStyle: { fontFamily: '"Comic Sans MS", "Comic Sans", cursive' },
    description: "Playful & casual",
  },
];

export default function ThemeModule() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { colorTheme, setColorTheme } = useColorTheme();
  const { fontTheme, setFontTheme } = useFontTheme();

  return (
    <main className="min-h-screen pt-24 pb-16 px-6 md:px-20">
      {/* BACK BUTTON */}
      <Link href="/">
        <Button variant="link" className="absolute left-6 md:left-20 top-26">
          <ArrowLeft />
          Back to Landing
        </Button>
      </Link>

      <div className="max-w-2xl mx-auto space-y-12 pt-12">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appearance</h1>
          <p className="text-muted-foreground mt-1">
            Customize how PKPLETSGOO looks for you.
          </p>
        </div>

        {/* Dark / Light / System */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Mode
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {lightDarkOptions.map(({ value, label, icon: Icon }) => {
              const active = theme === value;
              return (
                <button
                  key={value}
                  onClick={() => setTheme(value)}
                  className={cn(
                    "relative flex flex-col items-center gap-3 rounded-xl border-2 p-5 transition-all",
                    active
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40 hover:bg-muted/50",
                  )}
                >
                  {active && (
                    <span className="absolute top-2.5 right-2.5 flex items-center justify-center size-5 rounded-full bg-primary text-primary-foreground">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                  )}
                  <Icon
                    className={cn(
                      "size-6",
                      active ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm font-medium",
                      active ? "text-primary" : "text-foreground",
                    )}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Color Themes */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Color
          </h2>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
            {colorOptions.map(({ value, label, light, dark }) => {
              const active = colorTheme === value;
              const swatchClass = resolvedTheme === "dark" ? dark : light;
              return (
                <button
                  key={value}
                  onClick={() => setColorTheme(value)}
                  className="flex flex-col items-center gap-2 group"
                  title={label}
                >
                  <span
                    className={cn(
                      "relative flex items-center justify-center size-12 rounded-full border-2 transition-all",
                      swatchClass,
                      active
                        ? "border-foreground scale-110 shadow-md"
                        : "border-transparent group-hover:scale-105 group-hover:border-foreground/30",
                    )}
                  >
                    {active && (
                      <Check
                        className={cn(
                          "size-5 stroke-3",
                          resolvedTheme === "dark"
                            ? "text-zinc-900"
                            : "text-white",
                        )}
                      />
                    )}
                  </span>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Font Themes */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Font
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fontOptions.map(({ value, label, previewStyle, description }) => {
              const active = fontTheme === value;
              return (
                <button
                  key={value}
                  onClick={() => setFontTheme(value)}
                  className={cn(
                    "relative flex items-center gap-4 rounded-xl border-2 px-4 py-3 text-left transition-all",
                    active
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40 hover:bg-muted/50",
                  )}
                  style={previewStyle}
                >
                  {/* Font name rendered in its own typeface */}
                  <span className="text-2xl font-semibold w-16 shrink-0 text-foreground">
                    Aa
                  </span>
                  <span className="flex flex-col min-w-0">
                    <span
                      className={cn(
                        "text-sm font-medium truncate",
                        active ? "text-primary" : "text-foreground",
                      )}
                    >
                      {label}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {description}
                    </span>
                  </span>
                  {active && (
                    <span className="absolute top-2.5 right-2.5 flex items-center justify-center size-5 rounded-full bg-primary text-primary-foreground">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Live Preview */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Preview
          </h2>
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary" />
              <div className="space-y-1.5">
                <p className="text-sm font-semibold leading-none">
                  The quick brown fox
                </p>
                <p className="text-xs text-muted-foreground">
                  jumps over the lazy dog
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2.5 w-full rounded bg-muted" />
              <div className="h-2.5 w-4/5 rounded bg-muted" />
              <div className="h-2.5 w-3/5 rounded bg-muted" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
                Primary
              </span>
              <span className="inline-flex items-center rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground">
                Secondary
              </span>
              <span className="inline-flex items-center rounded-md border px-3 py-1.5 text-xs font-medium">
                Outlined
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
