"use client";

import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  return <>{children}</>;
}
