import Hero from "../sections/Hero";
import Services from "../sections/Services";
import Stats from "../sections/Stats";
import CTA from "../sections/CTA";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Services />
      <Stats />
      <CTA />
    </div>
  );
}