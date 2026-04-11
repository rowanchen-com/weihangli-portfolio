"use client";

import { useScrollTo, type SectionId } from "@/hooks/useScrollTo";

const NAV_ITEMS: { label: string; id: SectionId }[] = [
  { label: "Services", id: "services" },
  { label: "Works", id: "works" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export default function Header() {
  const scrollTo = useScrollTo();

  return (
    <header className="flex justify-between items-start pt-8">
      <button
        onClick={() => scrollTo("home")}
        className="text-base leading-relaxed text-foreground/60 tracking-tight text-left font-medium"
      >
        <p className="md:hidden">Web Developer</p>
        <p className="md:hidden">& Designer</p>
        <p className="hidden md:block md:text-lg lg:text-xl">Web Developer & Designer</p>
      </button>
      <nav className="flex flex-col items-end gap-1.5 md:flex-row md:items-center md:gap-4">
        {NAV_ITEMS.map(({ label, id }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="text-base text-foreground/60 md:text-lg lg:text-xl tracking-tight cursor-pointer font-medium"
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}
