import ImageComponent from "./ImageComponent";
import InternalLinkComponent from "./InternalLinkComponent";
import ExternalLinkComponent from "./ExternalLinkComponent";

const portableTextComponents = {
  types: {
    image: ImageComponent,
  },

  marks: {
    internalLink: InternalLinkComponent,
    externalLink: ExternalLinkComponent,
  },
};

export default portableTextComponents;
