"use client";


import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";


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
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem("theme") as Theme | null) ?? "system";
  });
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const saved = (localStorage.getItem("theme") as Theme | null) ?? "system";
    return saved === "system" ? getSystemTheme() : (saved as "light" | "dark");
  });
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    if (typeof window === "undefined") return "default";
    return (localStorage.getItem("color-theme") as ColorTheme | null) ?? "default";
  });
  const [fontTheme, setFontThemeState] = useState<FontTheme>(() => {
    if (typeof window === "undefined") return "default";
    return (localStorage.getItem("font-theme") as FontTheme | null) ?? "default";
  });


  // Sync DOM with state
  useEffect(() => { applyDarkMode(resolvedTheme); }, [resolvedTheme]);
  useEffect(() => { applyColorTheme(colorTheme); }, [colorTheme]);
  useEffect(() => { applyFontTheme(fontTheme); }, [fontTheme]);


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
    localStorage.setItem("theme", newTheme);
    applyDarkMode(resolved);
  }, []);


  const setColorTheme = useCallback((newColor: ColorTheme) => {
    setColorThemeState(newColor);
    localStorage.setItem("color-theme", newColor);
    applyColorTheme(newColor);
  }, []);


  const setFontTheme = useCallback((newFont: FontTheme) => {
    setFontThemeState(newFont);
    localStorage.setItem("font-theme", newFont);
    applyFontTheme(newFont);
  }, []);


  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
        <FontThemeContext.Provider value={{ fontTheme, setFontTheme }}>
          {children}
        </FontThemeContext.Provider>
      </ColorThemeContext.Provider>
    </ThemeContext.Provider>
  );
}