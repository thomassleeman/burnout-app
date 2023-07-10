// app/not-found.tsx
import Link from "next/link";
import { FC } from "react";
import FourOhFour from "@/components/design/FourOhFour";

const NotFound: FC = () => {
  return (
    <div>
      <FourOhFour />
      <button>
        <Link className="rounded-md bg-yellow-500 p-4 text-white" href="/">
          Home
        </Link>
      </button>
    </div>
  );
};

export default NotFound;
