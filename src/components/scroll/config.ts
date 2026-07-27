import type { LenisOptions } from "lenis";

export const SECTION_IDS = [
  "home",
  "services",
  "works",
  "about",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/** Header omits home (logo handles it). */
export const HEADER_SECTION_IDS = SECTION_IDS.filter(
  (id): id is Exclude<SectionId, "home"> => id !== "home",
);

export const SCROLL_DURATION = 1.2;

export const LENIS_OPTIONS = {
  lerp: 0.1,
  duration: SCROLL_DURATION,
  smoothWheel: true,
  autoRaf: false,
  syncTouch: false,
} as const satisfies LenisOptions;

export const LENIS_REDUCED_MOTION_OPTIONS = {
  ...LENIS_OPTIONS,
  lerp: 1,
  duration: 0,
  smoothWheel: false,
} as const satisfies LenisOptions;
