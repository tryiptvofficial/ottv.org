"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useSyncExternalStore } from "react";

const subscribeNoop = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // false during SSR and hydration, true after: the theme is only known in the browser.
  const isMounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  if (!isMounted) {
    return null;
  }

  const isDarkMode = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-5 w-5" />
      <Switch
        id="theme-toggle"
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
        className="touch-target"
      />
      <Moon className="h-5 w-5" />
    </div>
  );
}
