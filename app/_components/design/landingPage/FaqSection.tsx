import Link from "next/link";

const faqs = [
  {
    id: 0,
    question:
      "What are my legal responsibilities as an employer regarding stress and burnout?",
    answer: (
      <p>
        Every company needs to consider the potential damage that job-related
        stress may cause their employees. Having done this, measures must be put
        in place to deal with the identified risk. The key is to offer support
        to your team members before burnout becomes a problem. Check out our
        free article:{" "}
        <Link
          className="text-emerald-700 underline underline-offset-2 hover:text-emerald-600"
          href="/articles/stress-and-burnout-what-are-my-legal-responsibilities-as-an-employer"
        >
          Stress and Burnout: What Are My Legal Responsibilities as an Employer?
        </Link>
      </p>
    ),
  },
  {
    id: 1,
    question: "How is user data protected?",
    answer:
      "We prioritise the security and confidentiality of your employees' data by employing advanced encryption techniques. All user inputs are encrypted using industry-standard AES-256 encryption, making the data unreadable to unauthorised parties. Data transmitted between your device and the app is secured via HTTPS, safeguarding your information during transfer. We also perform regular security audits to adhere to the latest industry standards and best practices, ensuring your personal information remains protected at all times.",
  },
  {
    id: 1,
    question: "Is the app suitable for organisations of all sizes?",
    answer:
      "Yes, Burnout Hub is designed to benefit teams and companies of all scales, from small businesses to large enterprises.",
  },
  {
    id: 1,
    question: "What exactly is The Burnout Hub?",
    answer:
      "The Burnout Hub is a comprehensive web application designed to help businesses support their employees in understanding and addressing workplace burnout. It offers a suite of tools and resources, including interactive courses, chatbot assessments for potential burnout, self-reflection and writing exercises, guided journaling prompts, informative articles, daily stress ratings, and graphical visualizations of stress and burnout data.",
  },
  {
    id: 1,
    question: "How can The Burnout Hub help my organisation?",
    answer:
      "By integrating The Burnout Hub into your organization, you provide your team with proactive resources to manage stress effectively. This not only helps in enhancing employee well-being but also reduces the negative impacts of burnout on productivity, absenteeism, and staff turnover. For a small monthly fee per user, The Burnout Hub empowers your employees to tackle burnout, ultimately contributing to a healthier, more productive workplace.",
  },
  {
    id: 1,
    question: "Do you offer a discount to charitable organisations?",
    answer:
      "Yes, we offer discounts of between 10 and 15% to charitable organisations, speak to one of our team to discuss this with us further.",
  },
];

export default function FaqSection() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mt-6 text-base/7 text-gray-600">
            Have a different question and can’t find the answer you’re looking
            for? You can get in touch with our team by{" "}
            <a
              href="#"
              className="font-semibold text-emerald-600 hover:text-emerald-500"
            >
              sending us an email
            </a>{" "}
            and we’ll get back to you <em>same day</em>.
          </p>
        </div>
        <div className="mt-20">
          <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <dt className="text-base/7 font-semibold text-gray-900">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
