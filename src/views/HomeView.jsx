"use client";

import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import CTA from "@/sections/CTA";

export default function HomeView() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Services />
      <CTA />
    </div>
  );
}
