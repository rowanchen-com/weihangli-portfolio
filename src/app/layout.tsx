import type { ReactNode } from "react";

/** Root pass-through; `<html>` / `<body>` live in `[locale]/layout.tsx` for `lang` + i18n. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
