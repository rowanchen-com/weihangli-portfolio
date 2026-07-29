# Weihang Li Portfolio — 设计风格指南

本文档总结本作品集站点的视觉语言、排版、动效与布局约定，便于后续改版或扩展时保持一致。

---

## 1. 整体气质

| 维度 | 描述 |
|------|------|
| **定位** | 全栈开发者个人作品集 — 沉稳、克制、偏编辑式排版 |
| **氛围** | 暖灰纸感浅底 + 近黑深色内容区；冷暖中性，无高饱和品牌色 |
| **结构** | 单页长滚动；区块清晰分段，首屏品牌名主导 |
| **气质关键词** | 大字号、紧字距、大写标题、等宽辅文、滚动叙事、动效有目的 |

避免：紫色渐变、霓虹光效、堆叠卡片墙、首屏信息过载。

---

## 2. 色彩系统

定义位置：`src/styles/globals.css`。只保留本站实际使用的语义色；**勿再引入**未使用的 shadcn 全套 token（如 `chart-*`、`sidebar-*`、`primary`、`card`、`popover` 等）。

### 2.1 核心色板

| Token | 值 | 用途 |
|-------|-----|------|
| `--background` | `#e8e8e3` | 页面浅底（暖灰纸感）；微信悬停面板底 |
| `--foreground` | `oklch(0.145 0 0)` | 浅底上的主文字 |
| `--secondary` | `#080807` | **深色章节表面**（Services / Works / About；本站语义，非 shadcn「次要按钮色」） |
| `--secondary-foreground` | `#d1d1c7` | 深色区块主文字 |
| `--secondary-border` | `#393632` | 深色区内分割线 |
| `--muted-foreground` | `oklch(0.556 0 0)` | 次要说明、可用性文案 |
| `--destructive` | `oklch(0.577 0.245 27.325)` | 表单错误文案 |
| `--border` / `--ring` | 中性浅灰 | base 层边框与 focus outline |

### 2.2 联系区与滚动相关

| Token / 工具类 | 用途 |
|----------------|------|
| `--contact-surface-top` `#1a1814` | 联系区渐变顶部 |
| `.bg-contact-gradient` | 联系区纵向深色渐变 |
| `.bg-contact-radial-highlight` | 顶部微弱径向高光 |
| `.surface-contact-form` | 表单半透明毛玻璃容器 |
| `--scroll-top-surface` `#bfbfb1` | 回顶按钮底（亦为滚动条 thumb） |
| `--scroll-top-foreground` `#524d47` | 回顶箭头色（亦为滚动条 hover） |

### 2.3 滚动条

- Track / thumb / hover 分别引用 `--background`、`--scroll-top-surface`、`--scroll-top-foreground`（单一真源）
- 细滚动条（约 6px），圆角胶囊

### 2.4 透明度层级（深色区）

深色区块常用「前景色 + 透明度」区分层级，而不是另开一套色相：

- 主标题：接近 `secondary-foreground` 满不透明
- 正文：`/80`、`/75`
- 标签 / 编号：`/50`、`/70`
- 边框：`secondary-border` 或 `white/10`（叠在深色/图片上的透明度可硬编码）

---

## 3. 字体与排版

### 3.1 字体栈

- **主字体：** [Figtree](https://fonts.google.com/specimen/Figtree)（`next/font/google`，变量 `--font-figtree`）
- **等宽：** `font-mono` — 用于日期、技能名、分类标签、表单输入、语言切换、时钟等「元数据」感文案

### 3.2 字重与字距

| 用途 | 典型样式 |
|------|----------|
| 品牌 / 区块大标题 | `font-semibold` + `tracking-tighter` + 常配 `uppercase` |
| 导语 / 中等强调 | `font-medium` + `tracking-tight` |
| 正文说明 | `font-light` / `font-normal`，行高 `leading-snug` |
| 等宽元数据 | `font-mono` + `uppercase` + `tracking-wider` 或 `tracking-tight` |

### 3.3 字号策略

- **首屏品牌名：** 桌面约 `17.5vw`，极紧行高（`leading-[0.7]`），并 `scale-y-[0.88]` 压缩纵向比例
- **区块标题：** 常用 `text-6xl`～`[7vw]` / `[8vw]`，或 `clamp()` 做流体字号
- **联系区标题：** `clamp(64px, 9vw, 144px)`，居中大写
- **正文：** 桌面多在 `text-lg`～`text-2xl` / `text-3xl`，`max-w-[25ch]`～`[40ch]` 控制行长
- **可读性：** 广泛使用 `text-balance`

### 3.4 文案语气

- 导航与区块标签：大写英文 / 对应 locale 短标签
- 技能、分类、日期：等宽、大写，偏「终端 / 索引」感
- 品牌名 **WEIHANG LI** 在首屏是最强视觉信号，压过副标题

---

## 4. 布局与网格

### 4.1 页面骨架

```
PageIntro（全屏深色遮罩揭开）
→ Hero（浅底，全屏）
→ What I Do（深色，圆角顶）
→ Selected Works（深色）
→ About（深色，圆角底 + 滚出缩放）
→ Contact（叠在深色区上的渐变卡片）
→ Footer（回到浅底语境）
```

### 4.2 网格

- 主内容多用 **12 列网格**（`grid-cols-12`），`gap-x-4`～`gap-x-6`
- 文案常从 **第 6 列起占 7 列**（`md:col-start-6 md:col-span-7`），左留白形成编辑式不对称
- 水平内边距：Hero `px-8`；深色区块多为 `px-10`；联系区随断点 `px-4`～`px-10`

### 4.3 圆角

| Token | 计算 | 常见用途 |
|-------|------|----------|
| `--radius` | `0.625rem` | 基准 |
| `rounded-sm` / `rounded-md` | 图片、项目卡、联系外壳 | |
| `rounded-2xl` / `rounded-3xl` | 表单容器、深色区上下圆角衔接 | |
| `rounded-full` | CTA、Badge、回顶按钮 | |

深色内容区与浅色首屏/页脚通过 **`rounded-t-3xl` / `rounded-b-3xl`** 形成「纸张叠层」过渡。

### 4.4 区块衔接

- Services 顶圆角压在 Hero 下
- About 底圆角 + 滚出时 `scale` / `y`，露出下方 Contact
- Contact 使用负 `margin-top`（约 `-40vh` / `-25vh`）叠进 About 下方视差空间

---

## 5. 组件视觉约定

### 5.1 按钮 / CTA

- Hero CTA：胶囊形（`rounded-full`）、`bg-foreground/80` 字反白、`uppercase`、`font-bold`
- Hover：从左向右的 wipe 遮罩填满（`bg-foreground`），箭头轻移放大
- 表单提交：`rounded-xl`、浅字深底（`bg-secondary-foreground text-secondary`），hover 变白；loading 用 Spinner

### 5.2 Badge

- `outline`：细描边胶囊，大写标签
- `filled`：实底胶囊，常用于年份

### 5.3 项目卡（ProjectCard）

- 外层：方形画幅 + 全出血背景图 + 内边距
- 内层：约 `4/3` 预览图、`rounded-lg`、`shadow-2xl`
- 桌面 hover：预览微放大 + 概要区高度展开；移动端概要常显
- 标题区：等宽分类 + 大标题（可配解密文字动效）+ Badge 行

### 5.4 表单

- 输入：`font-mono`、`rounded-xl`、`bg-white/5`、`border-white/10`
- Focus：边框与 ring 提高白度透明度
- 错误：`text-destructive`，固定高度避免布局跳动

### 5.5 导航

- Header：轻量文字链，`text-foreground/60`，无强底栏
- NavOverlay：滚动后出现的全屏侧滑菜单（深色），大链接 + 社交 + 复制邮箱
- LocaleSwitcher：等宽小字 `EN / 简 / 繁 / 日 / 한`，斜杠分隔

### 5.6 Footer

- 浅底上的深色半透明字（`text-secondary/60`～`/80`）
- 栏目标题带底部分割线
- 链接 hover 用 RollingText 滚动字效
- 微信：自研悬停面板（相对定位 + hover，非 Radix Popover）
- 本地时钟等宽；回顶为暖灰圆钮 + 箭头上下弹跳

### 5.7 UI 小组件

- `Spinner`：表单提交 loading
- `RollingText`：Footer 链接字效
- 不依赖 Radix / shadcn 通用 Popover

---

## 6. 动效语言

### 6.1 技术栈

- **Lenis**：平滑滚动（`lerp: 0.1`，`duration: 1.2`）；尊重 `prefers-reduced-motion`
- **Motion**：入场、滚动驱动、hover

### 6.2 统一缓动

| 名称 | 曲线 | 场景 |
|------|------|------|
| Intro / Overlay | `[0.76, 0, 0.24, 1]` | 页面遮罩、菜单滑入 |
| Split / 卡片 | `[0.22, 1, 0.36, 1]` | 字符入场、项目卡 |
| Wipe CTA | `[0.25, 0.46, 0.45, 0.94]` | 按钮填充 |

常量见 `src/lib/animations.ts`：`INTRO.delay = 0.15`，`duration = 0.8`。

### 6.3 典型动效模式

1. **PageIntro**：全屏 `--secondary` 遮罩向上揭开，再播 Hero
2. **Hero 入场**：元素 `opacity + y:40` 错落入场；图片用 `clipPath` 自下而上揭开
3. **Hero 滚出**：整体 `y` 下移、`opacity` 降、`scale` 缩至约 `0.8`
4. **SplitText**：按字符 stagger（默认 `0.04s`）上移淡入
5. **FadeUp**：块级内容上浮入视口
6. **DecryptedText**：乱码解密显现（技能、作品分类/标题）
7. **Sticky 服务列表**：多卡 sticky 堆叠，编号 + 标题栏吸顶
8. **Works Counter**：左侧大号等宽数字跟随当前作品索引
9. **About 滚出**：整块深色区缩小并上移，露出 Contact

动效原则：**服务层级与叙事，不做装饰性噪点**；交互组件需处理 `useReducedMotion`。

---

## 7. 图片与材质

- Hero 封面：桌面彩色、移动端可 `grayscale`（当前移动实现）
- 作品区：背景图全出血 + 前景预览图（产品截图）
- About：竖构图肖像（约 `aspect-[4/5]`），`rounded-md`
- 整体偏写实摄影 / 产品截图，少用抽象装饰渐变作为主视觉

---

## 8. 断点与响应式

| 范围 | 行为要点 |
|------|----------|
| `< md` | Hero 改为竖排网格；作品概要常显；部分技能组标题隐藏；导航更紧凑 |
| `md+` | 12 列不对称布局；Works 显示左侧 Counter；项目卡 hover 展开概要 |
| 流体字号 | 多处 `vw` / `clamp()`，标题随视口伸缩 |

保持：**桌面与移动都是同一构图逻辑的压缩版**，不是另做一套仪表盘式布局。

---

## 9. 设计 Do / Don't

### Do

- 用大字号品牌名与区块标题建立第一印象
- 用浅/深纸张叠层区分章节
- 用等宽字体承载元数据（技能、日期、表单）
- 滚动驱动的缩放、粘滞、揭开服务于叙事
- 保持暖灰 + 近黑中性色，透明度做层级
- 类名合并统一用 `@/lib/utils` 的 `cn`

### Don't

- 首屏堆统计、日程、多卡片促销块
- 默认 Inter / 系统字体堆栈替代 Figtree
- 高饱和紫 / 霓虹 / 多层重阴影作为主风格
- 无交互必要的「卡片盒」装饰（边框+阴影+圆角凑一块）
- 忽略 `prefers-reduced-motion`
- 为「以后可能用」重新塞入 chart / sidebar / primary 等未用 token

---

## 10. 关键文件索引

| 文件 | 内容 |
|------|------|
| `src/styles/globals.css` | 色板、圆角、联系区工具类、滚动条 |
| `src/app/[locale]/layout.tsx` | Figtree 注入 |
| `src/lib/animations.ts` | Intro / Hero 动效常量 |
| `src/components/scroll/config.ts` | 区块 ID、Lenis 参数 |
| `src/components/sections/*` | 各区块布局与视觉 |
| `src/components/text/*` | SplitText / FadeUp / DecryptedText |
| `src/components/ui/spinner.tsx` | 表单 Spinner |
| `src/components/ui/RollingText.tsx` | Footer 滚动字 |
| `src/components/layout/Footer.tsx` | 含自研微信悬停面板 |

---

*文档与当前代码库对齐。若 token 或组件有变更，请同步更新本节。*
