"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonStar, Sun } from "lucide-react";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type ThemeSwitcherProps = {
  className?: string;
  isMobile?: boolean;
};

export const ThemeSwitcher = ({
  className,
  isMobile = false,
}: ThemeSwitcherProps) => {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <Sun />
      </Button>
    );
  }
  return (
    <Button
      onClick={toggleTheme}
      variant={isMobile ? "outline" : "ghost"}
      size="icon"
      className={cn("size-9", className)}
      aria-label="Toggle Theme"
    >
      <Sun className="absolute size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonStar className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
};
