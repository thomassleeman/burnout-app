//next.js
import Image from "next/image";

//sanity
import { urlForImage } from "@/sanity/lib/image";
import { getImageDimensions, getImageAsset } from "@sanity/asset-utils";

//types
import { SanityImage } from "@/types/sanity";

const ImageComponent = ({ value }: { value: SanityImage }) => {
  let dimensions = null;
  try {
    dimensions = getImageDimensions(value);
  } catch (error) {
    console.error("Failed to get image dimensions:", error);
    return null;
  }

  const { width, height } = dimensions;

  let imageUrl = "";
  try {
    imageUrl = urlForImage(value);
  } catch (error) {
    console.error("Failed to resolve asset ID from source:", error);
    console.log("SanityImage value:", value);
  }

  return (
    <figure>
      {imageUrl ? (
        <Image
          src={imageUrl}
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
      ) : (
        <p>Image could not be loaded</p>
      )}
      {value.caption && <figcaption>{value.caption}</figcaption>}
    </figure>
  );
};

export default ImageComponent;
