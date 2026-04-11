import "@/styles/globals.css";
import NavOverlay from "@/components/layout/NavOverlay";
import PageIntro from "@/components/layout/PageIntro";
import SmoothScrolling from "@/components/scroll/SmoothScrolling";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Figtree, Noto_Sans_SC, Noto_Sans_TC } from "next/font/google";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";

// 1. 定义字体
const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sc",
});

const notoSansTc = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-tc",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  // 2. 这里的 htmlClass 负责把所有的字体变量注入 DOM
  const htmlClass = `${figtree.variable} ${notoSansSc.variable} ${notoSansTc.variable}`;

  // 3. 构建字体栈：Figtree 永远在前（处理英文），中文字体在后
  const getFontStack = () => {
    if (locale === "zh-CN") return `${figtree.className} ${notoSansSc.className}`;
    if (locale === "zh-TW") return `${figtree.className} ${notoSansTc.className}`;
    return figtree.className;
  };

  return (
    <html lang={locale} className={htmlClass} suppressHydrationWarning>
      <body className={getFontStack()}>
        <NextIntlClientProvider messages={messages}>
          <PageIntro />
          <NavOverlay />
          <SmoothScrolling>{children}</SmoothScrolling>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}