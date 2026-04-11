"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { motion } from "motion/react";
import { useScrollTo, type SectionId } from "@/hooks/useScrollTo";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RollingText } from "@/components/ui/RollingText";

const menuLinks: { label: string; id: SectionId }[] = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Works", id: "works" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

const socialLinks = [
  // { label: "Linkedin", href: "https://www.linkedin.com/in/liweihang/" },
  { label: "Github", href: "https://github.com/hanggesimida" },
  { label: "WeChat" },
];

function LocalClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZoneName: "short",
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="font-mono font-medium uppercase text-secondary/60 text-base">{time}</span>;
}

function WeChatItem() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="group text-secondary/60 tracking-tighter hover:text-secondary/80 transition-colors overflow-hidden cursor-default"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <RollingText className="text-base sm:text-lg lg:text-xl">WeChat</RollingText>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        className="w-auto p-2"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Image
          src="/images/footer/wechat.webp"
          alt="WeChat QR Code"
          width={160}
          height={160}
          className="rounded-md"
        />
      </PopoverContent>
    </Popover>
  );
}

function ScrollToTopButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      aria-label="Scroll to top"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-center rounded-full bg-scroll-top-surface p-6 hover:scale-90 active:scale-95 transition-transform duration-300 cursor-pointer overflow-hidden"
    >
      <motion.div
        animate={hovered ? { y: [0, -14, 0] } : { y: 0 }}
        transition={
          hovered
            ? { duration: 0.6, ease: "easeInOut" }
            : { duration: 0.2 }
        }
      >
        <ArrowUp className="md:size-6 lg:size-10 text-scroll-top-foreground" />
      </motion.div>
    </button>
  );
}

export default function Footer() {
  const scrollTo = useScrollTo();

  return (
    <footer className="px-10 py-12 flex flex-col gap-12">
      {/* Top row: Menu + Socials */}
      <div className="grid grid-cols-2 gap-y-10 md:grid-cols-12 gap-x-8">
        {/* Menu */}
        <div className="flex flex-col md:col-span-6">
          <h3 className="mb-3 border-b-[1.5px] border-foreground/30 pb-2 font-bold text-lg lg:text-xl tracking-tighter text-secondary/80">
            Menu
          </h3>
          <ul className="flex flex-col gap-1.5">
            {menuLinks.map((link) => (
              <li key={link.label}>
                <button
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className="group text-left text-secondary/60 sm:text-lg lg:text-xl tracking-tighter cursor-pointer hover:text-secondary/80 transition-colors overflow-hidden"
                >
                  <RollingText className="text-base sm:text-lg lg:text-xl">{link.label}</RollingText>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div className="flex flex-col md:col-span-3">
          <h3 className="mb-3 border-b-[1.5px] border-foreground/30 pb-2 font-bold text-lg lg:text-xl tracking-tighter text-secondary/80">
            Socials
          </h3>
          <ul className="flex flex-col gap-1.5">
            {socialLinks.map((link) =>
              link.label === "WeChat" ? (
                <li key={link.label}>
                  <WeChatItem />
                </li>
              ) : (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-secondary/60 tracking-tighter hover:text-secondary/80 transition-colors overflow-hidden"
                  >
                    <RollingText className="text-base sm:text-lg lg:text-xl">{link.label}</RollingText>
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Bottom row: name / local time / scroll-to-top */}
      <div className="flex w-full items-end justify-between md:grid md:grid-cols-12 gap-x-8">
        {/* Name placeholder */}
        <span className="text-4xl font-semibold tracking-tighter text-secondary/80 md:col-span-6 md:text-5xl"></span>

        {/* Local time */}
        <div className="flex flex-col text-sm md:col-span-3">
          <span className="font-bold uppercase tracking-tighter text-secondary/80 text-base sm:text-lg">Local Time</span>
          <LocalClock />
        </div>

        {/* Scroll to top */}
        <div className="hidden md:flex md:col-span-3 justify-end">
          <ScrollToTopButton onClick={() => scrollTo("home")} />
        </div>
      </div>
    </footer>
  );
}
