//next.js
import Image from "next/image";

//sanity
import { urlForImage } from "@/sanity/lib/image";
import { getImageDimensions } from "@sanity/asset-utils";

//types
import { SanityImage } from "@/types/sanity";

const ImageComponent = ({ value }: { value: SanityImage }) => {
  const { width, height } = getImageDimensions(value);
  return (
    <figure>
      <Image
        src={urlForImage(value)}
        alt={value.alt || ""}
        height={700}
        width={700}
        loading="lazy"
        className="max-h-96 w-auto"
        style={{
          // Avoid jumping around with aspect-ratio CSS property
          aspectRatio: width / height,
        }}
      />
      {value.caption && <figcaption>{value.caption}</figcaption>}
    </figure>
  );
};

export default ImageComponent;
