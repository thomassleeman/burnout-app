"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type RollingNumberProps = {
  value: number;
  duration?: number; // Duration of the animation in milliseconds
};

export default function RollingNumber({
  value,
  duration = 1000,
}: RollingNumberProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5, // Trigger when 50% of the element is in view
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = value / (duration / 16);

      const counter = () => {
        start += increment;
        if (start >= value) {
          setCount(value);
        } else {
          setCount(Math.floor(start));
          requestAnimationFrame(counter);
        }
      };
      counter();
    }
  }, [inView, value, duration]);

  return (
    <div
      ref={ref}
      className="font-mono text-6xl font-semibold text-emerald-700 xl:text-7xl"
    >
      {count}
    </div>
  );
}
