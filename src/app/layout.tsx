import type { Metadata } from "next";
import "@/styles/globals.css";
import { Figtree } from 'next/font/google';
import NavOverlay from "@/components/layout/NavOverlay";
import PageIntro from "@/components/layout/PageIntro";
import SmoothScrolling from "@/components/scroll/SmoothScrolling";

const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree',
});

export const metadata: Metadata = {
  title: "Weihang Li - Full Stack Developer",
  description: "Weihang Li - Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={figtree.variable}>
      <body className={figtree.className}>

        <PageIntro />
        <NavOverlay />
        <SmoothScrolling>{children}</SmoothScrolling>

      </body>
    </html>
  );
}
