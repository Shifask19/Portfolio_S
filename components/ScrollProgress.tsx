"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div
      id="scroll-progress"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}
