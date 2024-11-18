import {
  PortableTextReactComponents,
  PortableTextComponentProps,
  PortableTextMarkComponentProps,
} from "@portabletext/react";
import { FC } from "react";
import { SanityImage } from "@/types/sanity";
import InfoBox, { InfoBoxProps } from "./InfoBox";
import ImageComponent from "./ImageComponent";
import InternalLinkComponent from "./InternalLinkComponent";
import ExternalLinkComponent from "./ExternalLinkComponent";

const portableTextComponents: PortableTextReactComponents = {
  types: {
    image: ({ value }: { value: SanityImage }) => (
      <ImageComponent value={value} />
    ),
    infoBox: InfoBox as FC<InfoBoxProps>,
  },
  list: {
    bullet: ({ children }: PortableTextComponentProps<any>) => (
      <ul className="ml-6 list-disc">{children}</ul>
    ),
    number: ({ children }: PortableTextComponentProps<any>) => (
      <ol className="ml-6 list-decimal">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: PortableTextComponentProps<any>) => (
      <li>{children}</li>
    ),
    number: ({ children }: PortableTextComponentProps<any>) => (
      <li>{children}</li>
    ),
  },
  marks: {
    internalLink: InternalLinkComponent,
    externalLink: ExternalLinkComponent,
  },
  block: {
    normal: ({ children }: PortableTextComponentProps<any>) => (
      <p>{children}</p>
    ),
    // You can add other block types as necessary
  },
  hardBreak: () => <br />,
  unknownMark: ({ children, value }: PortableTextMarkComponentProps<any>) => (
    <span className="unknown-mark">{children}</span>
  ),
  unknownType: ({ value }: PortableTextComponentProps<any>) => (
    <div>Unknown type: {JSON.stringify(value)}</div>
  ),
  unknownBlockStyle: ({ children, value }: PortableTextComponentProps<any>) => (
    <div className="unknown-block-style">{children}</div>
  ),
  unknownList: ({ children }: PortableTextComponentProps<any>) => (
    <ul className="unknown-list">{children}</ul>
  ),
  unknownListItem: ({ children }: PortableTextComponentProps<any>) => (
    <li className="unknown-list-item">{children}</li>
  ),
};

export default portableTextComponents;

// import {
//   PortableTextReactComponents,
//   PortableTextComponentProps,
// } from "@portabletext/react";
// import { FC } from "react";
// import { SanityImage } from "@/types/sanity";
// import InfoBox, { InfoBoxProps } from "./InfoBox";
// import ImageComponent from "./ImageComponent";
// import InternalLinkComponent from "./InternalLinkComponent";
// import ExternalLinkComponent from "./ExternalLinkComponent";

// const portableTextComponents: PortableTextReactComponents = {
//   types: {
//     image: ({ value }: { value: SanityImage }) => (
//       <ImageComponent value={value} />
//     ),
//     infoBox: InfoBox as FC<InfoBoxProps>,
//   },
//   list: {
//     bullet: ({ children }: PortableTextComponentProps<any>) => (
//       <ul className="ml-6 list-disc">{children}</ul>
//     ),
//     number: ({ children }: PortableTextComponentProps<any>) => (
//       <ol className="ml-6 list-decimal">{children}</ol>
//     ),
//   },
//   listItem: {
//     bullet: ({ children }: PortableTextComponentProps<any>) => (
//       <li>{children}</li>
//     ),
//     number: ({ children }: PortableTextComponentProps<any>) => (
//       <li>{children}</li>
//     ),
//   },
//   marks: {
//     internalLink: InternalLinkComponent,
//     externalLink: ExternalLinkComponent,
//   },
//   // Add the default required properties for type consistency
//   block: {
//     normal: ({ children }: PortableTextComponentProps<any>) => (
//       <p>{children}</p>
//     ),
//     // Add other block types if needed
//   },
//   hardBreak: () => <br />,
//   unknownMark: ({ children, markType }) => (
//     <span className={`unknown-mark-${markType}`}>{children}</span>
//   ),
//   unknownType: ({ value, type }) => (
//     <div className={`unknown-type-${type}`}>
//       Unknown type: {JSON.stringify(value)}
//     </div>
//   ),
// };

// export default portableTextComponents;
