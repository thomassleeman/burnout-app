import Image from "next/image";
import Investing from "./investing.png";
import CoffeeBreak from "./coffee-break.png";
import Collaboration from "./collaboration.png";
import RemoteWorking from "./remote-working.png";
import BrainLogo from "@/components/design/brainLogo.png";
export default function AboutPage() {
  return (
    <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
              Proactive burnout management for healthier, happier teams.{" "}
              <Image
                className="ml-4 inline-block h-16 w-auto"
                src={BrainLogo}
                alt="Pasu health logo"
                height={250}
                width={250}
              />
            </h2>
            <p className="text-pretty mt-8 text-lg font-medium text-gray-500 sm:text-xl/8">
              Burnout impacts productivity, retention, and workplace morale—but
              it doesn’t have to. Our platform provides businesses with the
              tools to support employee well-being, reduce stress, and foster a
              healthier, more resilient workforce.
            </p>
          </div>
        </div>
        <div className="flex w-full items-center">
          <Image
            className="h-auto w-1/4"
            src={CoffeeBreak}
            alt="Coffee Break"
            width={500}
            height={500}
          />

          <Image
            className="h-auto w-1/4"
            src={RemoteWorking}
            alt="Remote Working"
            width={500}
            height={500}
          />
          <Image
            className="h-auto w-1/4"
            src={Collaboration}
            alt="Collaboration"
            width={500}
            height={500}
          />

          <Image
            className="h-auto w-1/4"
            src={Investing}
            alt="Investing"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="mt-28">
        <div>
          <h2 className="text-pretty text-2xl font-semibold tracking-tight text-gray-900">
            Welcome to Pasu Health, your digital companion for understanding and
            managing stress and burnout in the workplace.
          </h2>{" "}
          <br />
          <br />
          <h3 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900">
            Our Story
          </h3>
          <br />
          <p>
            Pasu was born from the shared vision of Aaron Hanway and Thomas
            Sleeman. Aaron, a psychotherapist specializing in burnout and
            stress, and Thomas, a business owner and self-taught programmer,
            recognized that access to therapeutic support for most people was
            often limited and expensive. They believed that technology could
            bridge this gap, bringing the benefits of expert advice and
            therapeutic tools to a wider audience, on-demand and at an
            affordable price. Driven by this belief, they founded Pasu Health to
            make comprehensive stress and burnout management accessible to
            everyone.
          </p>
          <br />
          <br />
          <h3 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900">
            Our Mission
          </h3>
          <br />
          <br />
          <p>
            Our mission at Pasu Health is simple: to empower individuals to
            understand and effectively manage workplace stress and burnout. We
            are dedicated to providing you with the tools and support you need,
            whenever you need them. By making expert therapeutic techniques
            readily available through our digital platform, we strive to create
            healthier and more productive workplaces for all.
          </p>
        </div>
      </div>
    </div>
  );
}
