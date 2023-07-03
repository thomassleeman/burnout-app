import Link from 'next/link';

export default function IntroCoursePrompt() {
  return (
    <Link href="#">
      <div className="h-full">
        <article className="relative isolate flex w-full h-full">
          <img
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            src="https://source.unsplash.com/1K9T5YiZ2WU"
            alt=""
          />
          <div className="absolute left-0 pt-6 w-1/2">
            <h1 className="font-serif font-thin tracking-wide text-2xl leading-6 text-white bg-slate-700 p-6">
              What is Burnout?
            </h1>
          </div>
          <div className="absolute right-0 bottom-0 pb-6 w-2/3">
            <h1 className="font-serif font-thin tracking-wide text-xl text-right leading-6 text-slate-700 bg-white p-2 mt-6">
              Our introductory course is for everyone to help understand this
              important issue.
            </h1>
          </div>
        </article>
      </div>
    </Link>
  );
}
