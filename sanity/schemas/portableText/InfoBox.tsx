import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { PortableText } from "@portabletext/react";
import portableTextComponents from "@/sanity/schemas/portableText/portableTextComponents";
import { PortableTextBlock } from "@/types/sanity";

interface InfoBoxProps {
  value: {
    infoBoxType: string;
    content: PortableTextBlock[]; // Adjust the type of content based on its actual structure
  };
}

const InfoBox: React.FC<InfoBoxProps> = ({ value }) => {
  if (value) {
    const { infoBoxType, content } = value;

    let title, borderClass, backgroundClass, textClass;

    //Using standin css classes defined in globals.css that are equivalent to tailwind classes here because tailwind classes are inconsistent when defined dynamically when rendering a sanity component.
    switch (infoBoxType) {
      case "seeingItInAction":
        title = "Seeing it in action";
        borderClass = "custom-border-emerald-700";
        backgroundClass = "custom-bg-emerald-700-25";
        textClass = "custom-text-emerald-900";
        break;
      case "takeItFurther":
        title = "Take it further";
        borderClass = "custom-border-sky-600";
        backgroundClass = "custom-bg-sky-700-25";
        textClass = "custom-text-sky-900";
        break;
      case "tip":
        title = "Tip";
        borderClass = "custom-border-yellow-600";
        backgroundClass = "custom-bg-yellow-700-25";
        textClass = "custom-text-yellow-900";
        break;
      default:
        title = "Info Box";
        borderClass = "border-gray-600";
        backgroundClass = "bg-gray-100";
        textClass = "text-gray-900";
        break;
    }

    return (
      <div
        className={`w-full rounded-lg border-4 ${borderClass} font-sans ${backgroundClass} px-6`}
      >
        <h4
          className={`flex items-center gap-x-2 text-2xl font-semibold ${textClass}`}
        >
          <InformationCircleIcon className="h-8 w-8" />
          <span>{title}</span>
        </h4>
        <PortableText value={content} components={portableTextComponents} />
      </div>
    );
  } else return null;
};

export default InfoBox;
