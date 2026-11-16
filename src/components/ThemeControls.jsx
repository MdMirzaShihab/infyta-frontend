"use client";

import { useSyncExternalStore } from "react";
import { saveTheme, THEME_COLORS } from "@/lib/theme-script";
import { ThemeIcon } from "@/components/Icons";

// Tells every theme control on the page that the theme changed.
const EVENT = "infyta-theme";
const DARK = "(prefers-color-scheme: dark)";

// The explicit choice on <html> if there is one, otherwise the device setting.
function currentTheme() {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === "light" || chosen === "dark") return chosen;
  return window.matchMedia(DARK).matches ? "dark" : "light";
}

function subscribe(onChange) {
  const media = window.matchMedia(DARK);
  window.addEventListener(EVENT, onChange);
  media.addEventListener("change", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    media.removeEventListener("change", onChange);
  };
}

// Server render and the first client render know no theme (null), so both say aria-pressed="false".
function useTheme() {
  return useSyncExternalStore(subscribe, currentTheme, () => null);
}

// Applies for this page view even when storage is blocked (saveTheme then returns false).
function chooseTheme(theme) {
  document.documentElement.dataset.theme = theme;
  saveTheme(theme);
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) meta.content = THEME_COLORS[theme];
  window.dispatchEvent(new Event(EVENT));
}

export function ThemeButton() {
  return (
    <button
      type="button"
      className="themebtn"
      data-theme-toggle=""
      aria-label="Switch between Paper (light) and Blueprint (dark) theme"
      onClick={() => chooseTheme(currentTheme() === "dark" ? "light" : "dark")}
    >
      <ThemeIcon />
    </button>
  );
}

export function ThemeSwitch() {
  const theme = useTheme();
  return (
    <div className="themeseg">
      <span className="label">Theme</span>
      <span>
        <button type="button" data-set-theme="light" aria-pressed={theme === "light"} onClick={() => chooseTheme("light")}>
          Paper
        </button>
        <button type="button" data-set-theme="dark" aria-pressed={theme === "dark"} onClick={() => chooseTheme("dark")}>
          Blueprint
        </button>
      </span>
    </div>
  );
}
