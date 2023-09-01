import Link from "next/link";
import Image from "next/image";

export default function IntroCoursePrompt() {
  return (
    <Link href="#">
      <div className="h-full">
        <article className="relative isolate flex h-full w-full">
          <Image
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            // src="https://source.unsplash.com/1K9T5YiZ2WU"
            src="https://firebasestorage.googleapis.com/v0/b/burnout-project.appspot.com/o/images%2Fui-images%2Fstressed%20man%20outside.jpeg?alt=media&token=96abc240-8ee2-4bbd-a722-a9bd04323f66"
            alt="Burnout course image"
            width="500"
            height="500"
            priority
          />
          <div className="absolute left-0 w-1/2 pt-6">
            <h1 className="bg-slate-700 p-6 font-serif text-2xl font-thin leading-6 tracking-wide text-white">
              What is Burnout?
            </h1>
          </div>
          <div className="absolute bottom-0 right-0 w-2/3 pb-6">
            <h1 className="mt-6 bg-white p-2 text-right text-xl font-thin leading-6 tracking-wide text-slate-900">
              Our introductory course is for everyone to help understand this
              important issue.
            </h1>
          </div>
        </article>
      </div>
    </Link>
  );
}
