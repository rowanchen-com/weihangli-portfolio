"use client";

import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SelectedWorksSection from "@/components/sections/SelectedWorksSection";
import WhatIDoSection from "@/components/sections/WhatIDoSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <WhatIDoSection />
      <SelectedWorksSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
