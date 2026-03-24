"use client";


import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";


const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();


  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </button>
  );
};


export default ThemeToggle;