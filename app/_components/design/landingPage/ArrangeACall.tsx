"use client";

import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function ArrangeACall() {
  const [isVisible, setIsVisible] = useState(false);

  // const { ref: problemRef, inView: isProblemInView } = useInView({
  //   threshold: 0.1,
  //   triggerOnce: true,
  // });

  useEffect(() => {
    const appearancePoint = document.getElementById("our-solution-section");

    if (appearancePoint) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(appearancePoint);
          }
        },
        {
          threshold: 0.1,
        }
      );

      observer.observe(appearancePoint);

      return () => {
        observer.unobserve(appearancePoint);
      };
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8">
      <div className="pointer-events-auto flex items-center justify-between gap-x-6 border border-gray-400 bg-white px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
        <p className="lg:text-md text-sm/6 text-gray-600 xl:text-lg 2xl:text-xl">
          <div>
            Book a free demo with one of our team &nbsp;
            <span aria-hidden="true">&rarr;</span>
          </div>
        </p>
        <button
          type="button"
          className="flex w-16 justify-center rounded-md border-2 border-emerald-700 px-2 py-1 text-emerald-700"
        >
          <CalendarDaysIcon className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
}

// import { CalendarDaysIcon } from "@heroicons/react/20/solid";

// export default function ArrangeACall() {
//   return (
//     <>
//       <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8">
//         <div className="pointer-events-auto flex items-center justify-between gap-x-6 border-2 border-gray-600 bg-white px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
//           <p className="lg:text-md text-sm/6 text-gray-600 xl:text-lg">
//             <div>
//               Book a free demo with one of our team &nbsp;
//               <span aria-hidden="true">&rarr;</span>
//             </div>
//           </p>
//           <button
//             type="button"
//             className="flex w-16 justify-center rounded-md border-2 border-emerald-700 px-2 py-1 text-emerald-700"
//           >
//             <CalendarDaysIcon className="h-7 w-7" />
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
