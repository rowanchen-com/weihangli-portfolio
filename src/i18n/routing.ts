// 全局路由定义，定义了支持哪些语言以及路由的行为。
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh-CN", "zh-TW"], // 支持的语言列表：英文、简体中文、繁体中文
  defaultLocale: "en",               // 默认语言：英文
  localePrefix: "as-needed",         // 只有非默认语言才在 URL 中显示前缀（例如 /zh-CN/about），默认语言不显示（/about）
  localeDetection: false,            // 禁用浏览器语言自动检测（通常是为了让用户手动切换，避免自动跳转干扰）
});
