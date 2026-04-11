"use client";

import coverImage from "@/assets/image/cover.jpg";
import Header from "@/components/layout/Header";
import { HERO_VARIANTS, HERO_IMAGE_VARIANTS } from "@/lib/animations";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { motion, useMotionValue, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { useScrollTo } from "@/hooks/useScrollTo";

const today = new Date();
const MONTH_ABBR = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const todayLabel = `${MONTH_ABBR[today.getMonth()]}'${String(today.getDate()).padStart(2, '0')}`;

const WIPE_EASE = [0.25, 0.46, 0.45, 0.94] as const;

function CtaButton({ label, onClick, className }: { label: string; onClick: () => void; className: string }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`relative overflow-hidden inline-flex items-center bg-foreground/80 text-background font-bold uppercase cursor-pointer ${className}`}
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      initial="initial"
    >
      <motion.span
        className="absolute inset-0 bg-foreground rounded-full"
        variants={{ initial: { x: "-101%" }, hover: { x: "0%" } }}
        transition={{ duration: 0.4, ease: WIPE_EASE }}
      />
      <span className="relative z-10">{label}</span>
      <motion.span
        className="relative z-10"
        variants={{ initial: { x: 0, scale: 1 }, hover: { x: 2, scale: 1.15 } }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <ArrowUpRight className="w-[1em] h-[1em] ml-1" />
      </motion.span>
    </motion.button>
  );
}

const HERO_COPY = {
  nameFirst: "WEIHANG",
  nameLast: "LI",
  tagline:
    "I build fast, modern digital products that drive business growth, available for freelance projects worldwide.",
  cta: "Contact",
  imageAlt: "Profile photo",
  availabilityMobile: { line1: "Available For", line2: "Work" },
  availabilityDesktop: "Available For Work",
} as const;

export default function HeroSection() {
  const scrollTo = useScrollTo();
  const containerRef = useRef<HTMLDivElement>(null);

  // 用 Lenis 的浮点滚动值直接驱动，避免 window.scrollY 整数取整导致的惯性抖动
  const scrollProgress = useMotionValue(0);

  useLenis(({ scroll }) => {
    const el = containerRef.current;
    if (!el) return;
    const progress = Math.min(Math.max((scroll - el.offsetTop) / el.offsetHeight, 0), 1);
    scrollProgress.set(progress);
  });

  const y = useTransform(scrollProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollProgress, [0, 1], [1, 0.8]);

  return (
    <div id="home" ref={containerRef} className="relative h-screen z-0">
      <div className="top-0 h-screen flex flex-col px-8 pb-8">
        <Header />

        <motion.div
          className="flex-1 flex flex-col"
          style={{ y, opacity, scale, willChange: "transform", backfaceVisibility: "hidden" }}
        >
          <div className="flex-1 min-h-[60px]" />

          <div className="flex flex-col">
            {/* 标题 — index 0 */}
            <motion.h1
              className="text-7xl font-semibold tracking-tighter uppercase md:text-[17.5vw] md:leading-[0.7] whitespace-nowrap flex justify-between text-foreground/95 scale-y-[0.88]"
              variants={HERO_VARIANTS}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              {HERO_COPY.nameFirst}
              <br className="md:hidden" />
              <span className="hidden md:inline"> </span>
              {HERO_COPY.nameLast}
            </motion.h1>

            {/* ===== 移动端布局 ===== */}
            <div className="relative grid grid-cols-12 gap-x-4 gap-y-6 md:hidden">
              {/* 描述 + CTA — index 1 */}
              <motion.div
                className="col-span-12 space-y-4 mt-4"
                variants={HERO_VARIANTS}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                <p className="text-base max-w-[260px] text-balance text-foreground/60 font-medium">{HERO_COPY.tagline}</p>
                <div>
                  <CtaButton
                    label={HERO_COPY.cta}
                    onClick={() => scrollTo("contact")}
                    className="gap-2 px-5 py-4 rounded-full text-sm"
                  />
                </div>
              </motion.div>

              {/* 封面图片 — index 3 */}
              <motion.div
                className="col-span-4 overflow-hidden rounded-sm max-w-[300px]"
                variants={HERO_IMAGE_VARIANTS}
                initial="hidden"
                animate="visible"
                custom={3}
              >
                <Image
                  src={coverImage}
                  alt={HERO_COPY.imageAlt}
                  width={144}
                  height={144}
                  className="w-full h-full object-cover grayscale"
                />
              </motion.div>

              {/* 右侧日期信息 — index 4 */}
              <motion.div
                className="col-span-8 flex items-end justify-end"
                variants={HERO_VARIANTS}
                initial="hidden"
                animate="visible"
                custom={4}
              >
                <div className="text-right">
                  <p className="text-base uppercase text-muted-foreground leading-tight font-mono">
                    {HERO_COPY.availabilityMobile.line1}
                  </p>
                  <p className="text-base uppercase text-muted-foreground leading-tight font-mono">
                    {HERO_COPY.availabilityMobile.line2}
                  </p>
                  <p className="text-4xl font-semibold uppercase leading-none tracking-tight mt-1 text-foreground/80">
                    {todayLabel}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* ===== 桌面端布局 ===== */}
            <div className="hidden md:grid md:grid-cols-12 gap-x-6 mt-8">
              {/* 左侧：箭头 + 描述 + CTA — index 1 */}
              <motion.div
                className="col-span-4 flex flex-col justify-between"
                variants={HERO_VARIANTS}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                <div className="space-y-12">
                  <ArrowDownRight className="text-muted-foreground size-12" />
                  <div className="flex flex-col gap-8 pl-3">
                    <p className="text-2xl xl:text-3xl tracking-tight leading-[1.4] max-w-[32ch] text-balance text-foreground/60 font-medium">
                      {HERO_COPY.tagline}
                    </p>
                    <div>
                      <CtaButton
                        label={HERO_COPY.cta}
                        onClick={() => scrollTo("contact")}
                        className="tracking-tight px-4 py-3 text-xs md:px-6 md:py-4 md:text-base lg:px-8 lg:py-5 lg:text-lg rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 中间：封面图片 — index 3 */}
              <div className="col-span-4 flex justify-center">
                <motion.div
                  className="h-[50vh] max-w-lg overflow-hidden rounded-sm w-fit"
                  variants={HERO_IMAGE_VARIANTS}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                >
                  <Image
                    src={coverImage}
                    alt={HERO_COPY.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </motion.div>
              </div>

              {/* 右侧：日期信息 — index 4 */}
              <motion.div
                className="col-span-4 flex flex-col justify-end items-end"
                variants={HERO_VARIANTS}
                initial="hidden"
                animate="visible"
                custom={4}
              >
                <div className="text-right">
                  <p className="text-sm xl:text-base uppercase text-muted-foreground leading-tight tracking-wider font-mono">
                    {HERO_COPY.availabilityDesktop}
                  </p>
                  <p className="text-[8vw] text-foreground/80 font-semibold uppercase leading-none tracking-tighter mt-1">
                    {todayLabel}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
