"use client";

import { motion } from "framer-motion";

// Desktop-only decoration: hidden below md and for prefers-reduced-motion (spec 5.9 trade-off 2).
// Fixed positions so the server HTML and the client render match (no Math.random during render).
const ORBS = [
  { size: 220, left: 8, top: 12, duration: 24 },
  { size: 150, left: 72, top: 6, duration: 31 },
  { size: 280, left: 40, top: 58, duration: 19 },
  { size: 120, left: 88, top: 70, duration: 36 },
  { size: 190, left: 18, top: 82, duration: 27 },
  { size: 250, left: 58, top: 28, duration: 22 },
  { size: 135, left: 30, top: 38, duration: 33 },
  { size: 205, left: 80, top: 44, duration: 17 },
];

const DEFAULT_COLORS = ["#3ac1c2"];

export default function FloatingOrbs({ count = ORBS.length, opacityClass = "opacity-10", colors = DEFAULT_COLORS }) {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 hidden md:block motion-reduce:hidden" aria-hidden="true">
      {ORBS.slice(0, count).map((orb, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className={`absolute rounded-full ${opacityClass}`}
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `radial-gradient(circle, ${colors[i % colors.length]}, transparent)`,
            left: `${orb.left}%`,
            top: `${orb.top}%`,
          }}
        />
      ))}
    </div>
  );
}
