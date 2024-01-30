import { Martel } from "next/font/google";
import Footer from "../../../_components/ui/Footer";
import {
  BurnoutCourseHeadNav,
  BurnoutCourseFootNav,
} from "./burnoutCourseNavs";

const martel = Martel({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata = {
  title: "Burnout Course",
  description:
    "Understand burnout and how to create a more productive workplace.",
};

export default function RootLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const { slug } = params;
  console.log("slug: ", slug);
  return (
    <>
      <BurnoutCourseHeadNav slug={slug} />
      <section className="mt-8 lg:mt-16">{children}</section>
      <BurnoutCourseFootNav slug={slug} />
    </>
  );
}
