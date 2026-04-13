// 服务器端翻译加载，每当服务器处理请求时，这个文件负责告诉 next-intl 应该加载哪个语言包（JSON 文件）。
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  // 校验请求的语言是否在允许列表中，不在则回退到默认语言
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    // 动态导入对应的翻译文件，路径为 messages/en.json 等
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
