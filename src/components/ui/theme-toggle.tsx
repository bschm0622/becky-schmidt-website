// components/ui/ThemeToggle.tsx
"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = stored === "dark" || (!stored && prefersDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
    setIsDarkMode(shouldBeDark);
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
      {isDarkMode ? (
        // Moon icon
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      ) : (
        // Sun icon
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      )}
    </button>
  );
}
