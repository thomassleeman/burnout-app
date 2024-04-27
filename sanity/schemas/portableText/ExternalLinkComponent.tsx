import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const ExternalLinkComponent = ({ value, children }) => {
  const { url, newTab } = value;

  return (
    <a
      href={url}
      target={newTab ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="inline-flex items-center gap-x-1"
    >
      <span>{children}</span>
      {newTab && <ArrowTopRightOnSquareIcon className="mb-2 h-4 w-4" />}
    </a>
  );
};
export default ExternalLinkComponent;
