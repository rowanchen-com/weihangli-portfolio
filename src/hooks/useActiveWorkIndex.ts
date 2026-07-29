"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

/** Viewport Y ratio for the activation line (near sticky counter). */
const ACTIVATION_LINE_RATIO = 0.35;

/**
 * Scroll-spy: last item whose top has crossed the activation line is active.
 * All below the line → 0; all above → last index.
 */
export function useActiveWorkIndex(count: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const countRef = useRef(count);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    countRef.current = count;
    itemsRef.current.length = count;
    setActiveIndex((prev) => {
      if (count <= 0) {
        activeIndexRef.current = 0;
        return 0;
      }
      const next = Math.min(prev, count - 1);
      activeIndexRef.current = next;
      return next;
    });
  }, [count]);

  const scheduleUpdate = () => {
    if (rafRef.current != null) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;

      const total = countRef.current;
      if (total <= 0) return;

      const line = window.innerHeight * ACTIVATION_LINE_RATIO;
      let next = 0;

      for (let i = 0; i < total; i++) {
        const el = itemsRef.current[i];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) {
          next = i;
        }
      }

      if (next === activeIndexRef.current) return;
      activeIndexRef.current = next;
      setActiveIndex(next);
    });
  };

  const lenis = useLenis(scheduleUpdate);

  useEffect(() => {
    scheduleUpdate();

    window.addEventListener("resize", scheduleUpdate, { passive: true });
    if (!lenis) {
      window.addEventListener("scroll", scheduleUpdate, { passive: true });
    }

    return () => {
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [lenis]);

  function setItemRef(index: number) {
    return (el: HTMLElement | null) => {
      itemsRef.current[index] = el;
    };
  }

  return {
    displayIndex: activeIndex + 1,
    setItemRef,
  };
}
