"use client";

import { useTranslations } from "next-intl";
import { useScrollTo, type SectionId } from "@/hooks/useScrollTo";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";

const HEADER_IDS: SectionId[] = ["services", "works", "about", "contact"];

export default function Header() {
  const t = useTranslations("Nav");
  const tHeader = useTranslations("Header");
  const scrollTo = useScrollTo();

  return (
    <header className="flex justify-between items-start pt-8">
      <div className="flex flex-wrap items-start justify-between gap-4 md:contents">
        <button
          type="button"
          onClick={() => scrollTo("home")}
          className="text-base leading-relaxed text-foreground/60 tracking-tight text-left font-medium"
        >
          <p className="md:hidden">{tHeader("roleMobile1")}</p>
          <p className="md:hidden">{tHeader("roleMobile2")}</p>
          <p className="hidden md:block md:text-lg lg:text-xl">{tHeader("roleDesktop")}</p>
        </button>
      </div>
      <nav className="flex flex-col items-end gap-1 md:flex-row md:items-center md:gap-4">
        {HEADER_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollTo(id)}
            className="text-base text-foreground/60 md:text-lg lg:text-xl tracking-tight cursor-pointer font-medium"
          >
            {t(id)}
          </button>
        ))}
        <LocaleSwitcher className="hidden md:block text-sm ml-2" />
      </nav>
    </header>
  );
}
