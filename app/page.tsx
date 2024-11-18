import Image from "next/image";
import Hero from "@/components/design/landingPage/Hero";

import { CheckIcon } from "@heroicons/react/20/solid";
import { Dialog, DialogPanel } from "@headlessui/react";
import ArrangeACall from "@/components/design/landingPage/ArrangeACall";
import TheProblemSection from "@/components/design/landingPage/TheProblemSection";
import OurSolutionSection from "./_components/design/landingPage/OurSolutionSection";

const tiers = [
  {
    name: "Individual Plan",
    id: "tier-individual",
    href: "#",
    priceMonthly: "£19",
    description: "Tools to manage burnout for personal growth.",
    features: [
      "Access to courses",
      "Daily journaling prompts",
      "Chatbot assessments",
      "Self-reflection exercises",
    ],
    mostPopular: false,
  },
  {
    name: "Team Plan",
    id: "tier-team",
    href: "#",
    priceMonthly: "£49",
    description: "Support your entire team with our burnout management tools.",
    features: [
      "All features of Individual Plan",
      "Stress tracking for teams",
      "Data visualizations",
      "Team insights and reports",
    ],
    mostPopular: true,
  },
  {
    name: "Enterprise Plan",
    id: "tier-enterprise",
    href: "#",
    priceMonthly: "Contact us",
    description: "Customizable solution for large enterprises.",
    features: [
      "All Team Plan features",
      "Dedicated account manager",
      "Advanced analytics and integrations",
      "Custom onboarding and support",
    ],
    mostPopular: false,
  },
];

export default function Home() {
  return (
    <>
      <ArrangeACall />
      <main className="isolate">
        {/* Hero section */}
        <Hero />
        {/* The problem section */}
        <section id="the-problem-section" className=" bg-amber-50">
          <TheProblemSection />
        </section>

        {/* Features section */}
        <section id="our-solution-section">
          <OurSolutionSection />
        </section>

        {/* Pricing section */}
        <section className="bg-amber-50">
          <div className="py-24 sm:pt-48">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-base font-semibold text-emerald-600">
                  Pricing
                </h2>
                <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Pricing that scales with your needs
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Flexible plans designed for individuals, teams, and large
                  enterprises.
                </p>
              </div>
              <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {tiers.map((tier, tierIdx) => (
                  <div
                    key={tier.id}
                    className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${
                      tier.mostPopular ? "lg:z-10 lg:rounded-b-none" : "lg:mt-8"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-x-4">
                        <h3
                          id={tier.id}
                          className={`text-lg font-semibold ${
                            tier.mostPopular
                              ? "text-emerald-600"
                              : "text-gray-900"
                          }`}
                        >
                          {tier.name}
                        </h3>
                        {tier.mostPopular && (
                          <p className="rounded-full bg-emerald-600/10 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                            Most popular
                          </p>
                        )}
                      </div>
                      <p className="mt-4 text-sm text-gray-600">
                        {tier.description}
                      </p>
                      <p className="mt-6 flex items-baseline gap-x-1">
                        <span className="text-4xl font-bold tracking-tight text-gray-900">
                          {tier.priceMonthly}
                        </span>
                        {tier.priceMonthly !== "Contact us" && (
                          <span className="text-sm font-semibold text-gray-600">
                            /month
                          </span>
                        )}
                      </p>
                      <ul
                        role="list"
                        className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
                      >
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex gap-x-3">
                            <CheckIcon
                              aria-hidden="true"
                              className="h-6 w-5 flex-none text-emerald-600"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href={tier.href}
                      aria-describedby={tier.id}
                      className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                        tier.mostPopular
                          ? "bg-emerald-600 text-white shadow-sm hover:bg-emerald-500"
                          : "text-emerald-600 ring-1 ring-inset ring-emerald-200 hover:ring-emerald-300"
                      }`}
                    >
                      Buy plan
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mx-auto mt-32 max-w-7xl px-6 lg:px-8">
        <div className="border-t border-gray-900/10 py-16 sm:py-24 lg:py-32">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            {/* <Image alt="Company logo" src="/logo.png" className="h-9" /> */}
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Solutions
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Burnout Courses
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Chatbot Assessments
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Guided Journaling
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Support
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Contact Support
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
