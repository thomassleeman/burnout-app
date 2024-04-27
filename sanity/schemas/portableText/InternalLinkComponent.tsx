import Link from "next/link";

const InternalLinkComponent = ({ value, children }) => {
  const { slug = {} } = value;
  const href = `${slug.current}`;
  return (
    <Link
      className="text-emerald-800 decoration-emerald-800 dark:decoration-emerald-400"
      href={href}
    >
      {children}
    </Link>
  );
};

export default InternalLinkComponent;
