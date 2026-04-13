// 本地化导航工具，利用 routing 配置，生成了一套感应语言的导航组件和钩子。
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// 导出的 Link, useRouter 等是经过封装的
// 使用这里的 Link 时，你只需写 <Link href="/about">
// 它会自动根据当前语言变成 <a href="/zh-CN/about">
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
