"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const LOCALES = ["en", "zh-CN", "zh-TW"] as const;

type Tone = "default" | "onDark";

export default function LocaleSwitcher({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: Tone;
}) {
  const t = useTranslations("LocaleSwitcher");
  const pathname = usePathname();
  const locale = useLocale();

  const active =
    tone === "onDark"
      ? "font-semibold text-secondary-foreground underline underline-offset-4"
      : "font-semibold text-foreground underline underline-offset-4";
  const inactive =
    tone === "onDark"
      ? "text-secondary-foreground/70 hover:text-secondary-foreground"
      : "text-foreground/55 hover:text-foreground/90";

  return (
    <nav className={className} aria-label={t("label")}>
      <ul className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {LOCALES.map((code) => (
          <li key={code}>
            <Link
              href={pathname}
              locale={code}
              className={cn(
                "transition-colors",
                locale === code ? active : inactive,
              )}
            >
              {code === "en" ? t("en") : code === "zh-CN" ? t("zhCN") : t("zhTW")}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
