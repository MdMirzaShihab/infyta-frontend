"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/content/site";
import { dhakaNow, openStatus, weekCells } from "@/lib/hours";

// The Dhaka clock as an external store. The snapshot object is kept while the minute is unchanged,
// so React sees a stable value between ticks.
let last = null;
function readNow() {
  const now = dhakaNow();
  if (!last || last.date !== now.date || last.minutes !== now.minutes) last = now;
  return last;
}

function subscribe(onTick) {
  const timer = setInterval(onTick, 60000);
  return () => clearInterval(timer);
}

// null on the server and during hydration, so the static fallback is what both render first.
function useDhakaNow() {
  return useSyncExternalStore(subscribe, readNow, () => null);
}

export function OpenStatus({ variant = "short", className }) {
  const now = useDhakaNow();
  const status = now && openStatus(now);
  const text = status ? status[variant] : variant === "long" ? site.hours.display.join(" ") : site.hours.display[0];
  const state = !status ? "is-unknown" : status.open ? "" : "is-closed";
  return (
    <span className={["status", state, className].filter(Boolean).join(" ")} data-open-status="">
      <i className="dot" />
      <span>{text}</span>
    </span>
  );
}

export function WeekStrip() {
  const now = useDhakaNow();
  return (
    <div className="week" aria-hidden="true">
      {weekCells(now).map((cell) => (
        <div key={cell.day} className={[cell.off && "is-off", cell.today && "is-today"].filter(Boolean).join(" ") || undefined}>
          <b>{cell.label}</b>
          <span>{cell.text}</span>
        </div>
      ))}
    </div>
  );
}
