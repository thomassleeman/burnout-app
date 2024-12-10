import Image from "next/image";
import Hero from "@/components/design/landingPage/Hero";

import { Dialog, DialogPanel } from "@headlessui/react";
import ArrangeACall from "@/components/design/landingPage/ArrangeACall";
import TheProblemSection from "@/components/design/landingPage/TheProblemSection";
import OurSolutionSection from "./_components/design/landingPage/OurSolutionSection";
import FaqSection from "@/components/design/landingPage/FaqSection";
import PricingSection from "@/components/design/landingPage/PricingSection";
import BasicsCourseSection from "./_components/design/landingPage/BasicsCourseSection";
import Footer from "@/components/design/landingPage/LandingFooter";

export default function Home() {
  return (
    <div className="pb-96">
      <ArrangeACall />
      <main className="isolate">
        <section id="hero-section">
          <Hero />
        </section>
        <section id="the-problem-section" className=" bg-amber-50">
          <TheProblemSection />
        </section>
        <section id="our-solution-section">
          <OurSolutionSection />
        </section>
        <section className="bg-amber-50">
          <BasicsCourseSection />
        </section>
        <section id="pricing-section">
          <PricingSection />
        </section>
        <section id="faq-section">
          <FaqSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}
