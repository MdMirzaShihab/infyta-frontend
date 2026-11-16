"use client";

import { useEffect, useId, useSyncExternalStore } from "react";
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

// While an explicit choice exists, every theme-color meta carries that theme's colour, so their order
// and media no longer matter. Writes only on a difference, so the observer below cannot loop.
function paintThemeColor() {
  const theme = document.documentElement.dataset.theme;
  if (theme !== "light" && theme !== "dark") return;
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
    if (meta.content !== THEME_COLORS[theme]) meta.content = THEME_COLORS[theme];
  }
}

// React owns the theme-color metas (layout `viewport.themeColor`): it re-inserts or resets them with the
// server values after hydration and on client navigation. Repaint whenever <head> changes.
// Mounted once, by ThemeButton, which every page renders exactly once.
function useThemeColorSync() {
  useEffect(() => {
    paintThemeColor();
    const observer = new MutationObserver(paintThemeColor);
    observer.observe(document.head, { childList: true, subtree: true, attributes: true, attributeFilter: ["content"] });
    return () => observer.disconnect();
  }, []);
}

// Applies for this page view even when storage is blocked (saveTheme then returns false).
function chooseTheme(theme) {
  document.documentElement.dataset.theme = theme;
  saveTheme(theme);
  paintThemeColor();
  window.dispatchEvent(new Event(EVENT));
}

export function ThemeButton() {
  useThemeColorSync();
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

// Rendered twice per page (footer and phone menu), so the label id comes from useId.
export function ThemeSwitch() {
  const theme = useTheme();
  const labelId = useId();
  return (
    <div className="themeseg" role="group" aria-labelledby={labelId}>
      <span className="label" id={labelId}>Theme</span>
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
