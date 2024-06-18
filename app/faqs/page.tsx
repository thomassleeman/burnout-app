"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "What is the Burnout Hub?",
    answer: (
      <p>
        Burnout Hub is your go-to resource for understanding and managing
        burnout. We offer easy-to-understand, accurate information and resources
        backed by expert knowledge. Our mission is to empower you with the tools
        to recognise and overcome burnout in your life. We regularly update our
        content to ensure you have access to the latest and most effective
        strategies. Start exploring our platform today and discover the many
        ways we can help you on your journey to better professional well-being.
      </p>
    ),
  },
  {
    question: "Who is behind Burnout Hub?",
    answer: (
      <p>
        Burnout Hub is the brainchild of Aaron Hanway and Tom Sleeman, whose
        friendship began some 20 years ago while studying Psychology together at
        University. Through conversations about their own workplace experiences,
        they recognized a pressing need for a greater understanding of burnout –
        its causes, effects, and potential treatments. This realization sparked
        the idea for an online platform where individuals could access
        comprehensive information on the topic, and thus, Burnout Hub was born.{" "}
        <br />
        <br />
        Aaron, a counselor and psychotherapist based in Wicklow, Ireland, brings
        a wealth of personal and professional experience to Burnout Hub. He
        specializes in helping individuals from all walks of life who are
        grappling with burnout, a passion fueled by his own struggles in a
        previous career. Before transitioning to therapy, Aaron worked in the
        social care sector, where he faced significant burnout firsthand. This
        transformative experience ultimately led him to pursue a career as a
        therapist, dedicated to supporting others facing similar challenges. To
        learn more about Aaron&apos;s journey with burnout, be sure to explore
        the Burnout Stories section.
        <br />
        <br />
        Tom is a software engineer and small business owner based in Surrey,
        England. Having spent a number of years working on various projects and
        businesses - some successful and others not - Tom knows only too well
        the pressures of self-imposed goals and the importance of being aware of
        the signs of burnout.
      </p>
    ),
  },
  {
    question: "Who do I contact if I want to get in touch?",
    answer:
      "We'd love to hear from you! Feel free to share your experience with burnout, provide feedback to enhance The Burnout Hub or ask any questions you may have. You can reach us via email at contact@theburnouthub.com. We look forward to connecting with you!",
  },
  {
    question: "What can I do if I need immediate support?",
    answer: (
      <div>
        If you&apos;re feeling overwhelmed, stressed, or in crisis, there are
        people out there who can help. You don&apos;t have to manage it alone.
        <br />
        <br />
        Here is a list of some resources that can provide immediate, free and
        anonymous support:
        <br />
        <br />
        <b>United Kingdom:</b>
        <ul>
          <li>
            <b>Samaritans:</b> 24hr telephone on 116 123 and online chat support
            |{" "}
            <a className="text-emerald-700" href="https://www.samaritans.org/">
              samaritans.org
            </a>
          </li>{" "}
          <li>
            <b>Shout Crisis Text Line:</b> Text &quot;SHOUT&quot; to 85258 |{" "}
            <a className="text-emerald-700" href="https://giveusashout.org/">
              giveusashout.org
            </a>
          </li>
          <li>
            <b>CALM (Campaign Against Living Miserably):</b> 0800 58 58 58 (5 pm
            - midnight daily) |{" "}
            <a className="text-emerald-700" href="https://www.thecalmzone.net/">
              thecalmzone.net
            </a>
          </li>
          <li>
            <b>The Mix - Support for under 25s:</b> 0808 808 4994 (phone) or use
            their online crisis messenger |{" "}
            <a className="text-emerald-700" href="https://www.themix.org.uk/">
              themix.org.uk
            </a>
          </li>
        </ul>
        <br />
        <b>Ireland:</b>
        <ul>
          <li>
            <b>Samaritans Ireland:</b> 24hr telephone on 116 123 and online chat
            support |{" "}
            <a className="text-emerald-700" href="https://www.samaritans.org">
              samaritans.org
            </a>
          </li>
          <li>
            <b>Pieta House:</b> Providing support for suicide ideation and
            self-harm. 1800 247 247 (phone) or text &quot;HELP&quot; to 51444 |{" "}
            <a className="text-emerald-700" href="https://www.pieta.ie/">
              pieta.ie
            </a>
          </li>
          <li>
            <b>Aware (for depression and bipolar disorder):</b> 1800 80 48 48
            (10 am - 10 pm daily) |{" "}
            <a className="text-emerald-700" href="https://www.aware.ie/">
              aware.ie
            </a>
            <br />
            SpunOut: Text &quot;HELLO&quot; to 50808 for free, 24/7 text support
            |{" "}
            <a className="text-emerald-700" href="https://text50808.ie/">
              text50808.ie
            </a>
          </li>
        </ul>
      </div>
    ),
  },
];

export default function FAQsPage() {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-4xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <DisclosureButton className="flex w-full items-start justify-between text-left text-gray-900">
                        <h1 className="text-xl font-light leading-7 text-gray-700">
                          {faq.question}
                        </h1>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </DisclosureButton>
                    </dt>
                    <DisclosurePanel as="dd" className="mt-2 md:pr-12">
                      <div className="mt-6 text-base leading-7 text-gray-600">
                        {faq.answer}
                      </div>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
