import Link from "next/link";
import { IntLinkValueProp } from "@/types/sanity";
import { PortableTextMarkComponentProps } from "@portabletext/react";

const InternalLinkComponent = ({
  value,
  children,
}: PortableTextMarkComponentProps<IntLinkValueProp>) => {
  if (value && value.slug) {
    let slug = value.slug;

    const href = `${slug.current}`;
    return (
      <Link
        className="text-emerald-800 decoration-emerald-800 dark:decoration-emerald-400"
        href={href}
      >
        {children}
      </Link>
    );
  }
};

export default InternalLinkComponent;

// import Link from "next/link";
// import { IntLinkValueProp } from "@/types/sanity";
// import { PortableTextMarkComponentProps } from "@portabletext/react";

// const InternalLinkComponent = ({
//   value,
//   children,
// }: PortableTextMarkComponentProps<IntLinkValueProp>) => {

//   const { slug = {} } = value;
//   const href = `${slug.current}`;
//   return (
//     <Link
//       className="text-emerald-800 decoration-emerald-800 dark:decoration-emerald-400"
//       href={href}
//     >
//       {children}
//     </Link>
//   );
// };

// export default InternalLinkComponent;
