"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right";

const OFFSET: Record<Direction, (dist: number) => { x?: number; y?: number }> = {
  up: (dist) => ({ y: dist }),
  left: (dist) => ({ x: -dist }),
  right: (dist) => ({ x: dist }),
};

export function Reveal({
  children,
  delay = 0,
  y = 18,
  direction = "up",
  distance,
  className,
}: {
  children: ReactNode;
  delay?: number;
  /** @deprecated use `distance` — kept so existing y-offset call sites still work */
  y?: number;
  direction?: Direction;
  distance?: number;
  className?: string;
}) {
  const dist = distance ?? y;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...OFFSET[direction](dist) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
