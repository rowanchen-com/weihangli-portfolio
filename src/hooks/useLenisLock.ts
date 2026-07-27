"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";

/** Pause Lenis while an overlay/menu is open; resume on close or unmount. */
export function useLenisLock(locked: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    if (locked) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.start();
    };
  }, [lenis, locked]);
}
