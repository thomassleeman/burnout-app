import ImageComponent from "./ImageComponent";
import InternalLinkComponent from "./InternalLinkComponent";
import ExternalLinkComponent from "./ExternalLinkComponent";
import InfoBox from "./InfoBox";

const portableTextComponents = {
  types: {
    image: ImageComponent,
    infoBox: InfoBox,
  },

  marks: {
    internalLink: InternalLinkComponent,
    externalLink: ExternalLinkComponent,
  },
};

export default portableTextComponents;
