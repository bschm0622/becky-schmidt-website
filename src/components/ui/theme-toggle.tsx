"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = stored === "dark" || (!stored && prefersDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
    setIsDarkMode(shouldBeDark);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = isDarkMode ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    setIsDarkMode(nextTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="ml-auto p-2 text-foreground hover:bg-primary rounded-full"
      aria-label="Toggle theme"
    >
      {/* Always render button structure — only icon changes after hydration */}
      {mounted ? (
        isDarkMode ? (
          // Moon icon
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
            <path d="M15.5 18.5l-3 1.5l.5 -3.5l-2 -2l3 -.5l1.5 -3l1.5 3l3 .5l-2 2l.5 3.5z"></path>
            <path d="M4 4l7 7"></path>
            <path d="M9 4l3.5 3.5"></path>
            <path d="M4 9l3.5 3.5"></path>
          </svg>
        ) : (
          // Sun icon
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
            <path d="M6 6h3.5l2.5 -2.5l2.5 2.5h3.5v3.5l2.5 2.5l-2.5 2.5v3.5h-3.5l-2.5 2.5l-2.5 -2.5h-3.5v-3.5l-2.5 -2.5l2.5 -2.5z"></path>
          </svg>
        )
      ) : (
        // Placeholder/fallback icon to avoid layout shift
        <div className="w-6 h-6 rounded-full bg-muted animate-pulse" />
      )}
    </button>
  );
}
