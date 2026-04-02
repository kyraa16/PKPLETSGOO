"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getConfig, updateConfig } from "@/lib/actions/config";


// ── Types ─────────────────────────────────────────────────────


export type Theme = "light" | "dark" | "system";
export type ColorTheme =
  | "default"
  | "rose"
  | "blue"
  | "green"
  | "purple"
  | "orange"
  | "cyan"
  | "yellow";
export type FontTheme =
  | "default"
  | "poppins"
  | "nunito"
  | "roboto"
  | "times"
  | "comic";


// ── Contexts ──────────────────────────────────────────────────


type ThemeContextType = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  canEditTheme: boolean;
  setTheme: (theme: Theme) => void;
};


type ColorThemeContextType = {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
};


type FontThemeContextType = {
  fontTheme: FontTheme;
  setFontTheme: (font: FontTheme) => void;
};


const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  resolvedTheme: "light",
  canEditTheme: false,
  setTheme: () => {},
});


export const ColorThemeContext = createContext<ColorThemeContextType>({
  colorTheme: "default",
  setColorTheme: () => {},
});


export const FontThemeContext = createContext<FontThemeContextType>({
  fontTheme: "default",
  setFontTheme: () => {},
});


export const useTheme = () => useContext(ThemeContext);
export const useColorTheme = () => useContext(ColorThemeContext);
export const useFontTheme = () => useContext(FontThemeContext);


// ── Helpers ───────────────────────────────────────────────────


function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}


function applyDarkMode(resolved: "light" | "dark") {
  document.documentElement.classList.toggle("dark", resolved === "dark");
}


function applyColorTheme(theme: ColorTheme) {
  const html = document.documentElement;
  html.classList.forEach((c) => {
    if (c.startsWith("theme-")) html.classList.remove(c);
  });
  if (theme !== "default") html.classList.add(`theme-${theme}`);
}


function applyFontTheme(font: FontTheme) {
  const html = document.documentElement;
  html.classList.forEach((c) => {
    if (c.startsWith("font-") && c !== "font-sans") html.classList.remove(c);
  });
  if (font !== "default") html.classList.add(`font-${font}`);
}


// ── Provider ──────────────────────────────────────────────────


export default function ThemeProvider({
  children,
  canEditTheme = false,
}: {
  children: React.ReactNode;
  canEditTheme?: boolean;
}) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [colorTheme, setColorThemeState] = useState<ColorTheme>("default");
  const [fontTheme, setFontThemeState] = useState<FontTheme>("default");


  // Apply stored theme immediately to avoid flash before DB resolves
  useEffect(() => {
    const t = (localStorage.getItem("theme") as Theme) || "system";
    const c = (localStorage.getItem("color-theme") as ColorTheme) || "default";
    const f = (localStorage.getItem("font-theme") as FontTheme) || "default";
    const resolved = t === "system" ? getSystemTheme() : t;
    setThemeState(t);
    setResolvedTheme(resolved);
    setColorThemeState(c);
    setFontThemeState(f);
    applyDarkMode(resolved);
    applyColorTheme(c);
    applyFontTheme(f);
  }, []);

  // Load config from DB on mount and sync to localStorage
  useEffect(() => {
    getConfig().then((config) => {
      const t = config.theme as Theme;
      const c = config.colorTheme as ColorTheme;
      const f = config.fontTheme as FontTheme;
      const resolved = t === "system" ? getSystemTheme() : t;
      setThemeState(t);
      setResolvedTheme(resolved);
      setColorThemeState(c);
      setFontThemeState(f);
      applyDarkMode(resolved);
      applyColorTheme(c);
      applyFontTheme(f);
      localStorage.setItem("theme", t);
      localStorage.setItem("color-theme", c);
      localStorage.setItem("font-theme", f);
    });
  }, []);


  // Subscribe to real-time theme changes via SSE
  useEffect(() => {
    const es = new EventSource("/api/theme-stream");
    es.onmessage = (event) => {
      try {
        const { theme: t, colorTheme: c, fontTheme: f } = JSON.parse(event.data) as {
          theme: Theme;
          colorTheme: ColorTheme;
          fontTheme: FontTheme;
        };
        const resolved = t === "system" ? getSystemTheme() : t;
        setThemeState(t);
        setResolvedTheme(resolved);
        setColorThemeState(c);
        setFontThemeState(f);
        applyDarkMode(resolved);
        applyColorTheme(c);
        applyFontTheme(f);
        localStorage.setItem("theme", t);
        localStorage.setItem("color-theme", c);
        localStorage.setItem("font-theme", f);
      } catch {
        // malformed event — ignore
      }
    };
    return () => es.close();
  }, []);


  // Follow system preference when theme is "system"
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        const resolved = e.matches ? "dark" : "light";
        setResolvedTheme(resolved);
        applyDarkMode(resolved);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);


  const setTheme = useCallback((newTheme: Theme) => {
    const resolved = newTheme === "system" ? getSystemTheme() : newTheme;
    setThemeState(newTheme);
    setResolvedTheme(resolved);
    applyDarkMode(resolved);
    localStorage.setItem("theme", newTheme);
    updateConfig({ theme: newTheme });
  }, []);


  const setColorTheme = useCallback((newColor: ColorTheme) => {
    setColorThemeState(newColor);
    applyColorTheme(newColor);
    localStorage.setItem("color-theme", newColor);
    updateConfig({ colorTheme: newColor });
  }, []);


  const setFontTheme = useCallback((newFont: FontTheme) => {
    setFontThemeState(newFont);
    applyFontTheme(newFont);
    localStorage.setItem("font-theme", newFont);
    updateConfig({ fontTheme: newFont });
  }, []);


  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, canEditTheme, setTheme }}>
      <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
        <FontThemeContext.Provider value={{ fontTheme, setFontTheme }}>
          {children}
        </FontThemeContext.Provider>
      </ColorThemeContext.Provider>
    </ThemeContext.Provider>
  );
}
