"use client";

import { MotionConfig } from "framer-motion";

// Makes every framer-motion animation honour the visitor's prefers-reduced-motion setting.
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
