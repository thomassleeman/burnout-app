import ResponseOptions from "../widgets/ResponseOptions";
import LinkButton from "../widgets/LinkButton";
import InitialAssessmentHandler from "../widgets/InitialAssessmentHandler";
import ProceedToSolitaryProfile from "../widgets/ProceedToSolitaryProfile";
import CycleThroughProfilesToDiscuss from "../widgets/CycleThroughProfilesToDiscuss";
import { initialMessages } from "./messages";

const config = {
  initialMessages: initialMessages,
  state: {
    initialAssessmentScores: {
      exhaustion: 0,
      detachment: 0,
      emotionalImparement: 0,
      cognitiveImparement: 0,
    },
    lastUpdated: 0,
    profileString: "",
    profileArray: [],
  },
  widgets: [
    {
      widgetName: "ResponseOptions",
      widgetFunc: (props) => <ResponseOptions {...props} />,
      mapStateToProps: [
        "initialAssessmentScores",
        "lastUpdated",
        "profileString",
        "profileArray",
      ],
    },
    {
      widgetName: "LinkButton",
      widgetFunc: (props) => <LinkButton {...props} />,
    },
    {
      widgetName: "InitialAssessmentHandler",
      widgetFunc: (props) => <InitialAssessmentHandler {...props} />,
      mapStateToProps: ["initialAssessmentScores"],
    },
    {
      widgetName: "CycleThroughProfilesToDiscuss",
      widgetFunc: (props) => <CycleThroughProfilesToDiscuss {...props} />,
      mapStateToProps: ["profileArray"],
    },
    {
      widgetName: "ProceedToSolitaryProfile",
      widgetFunc: (props) => <ProceedToSolitaryProfile {...props} />,
      mapStateToProps: ["profileString"],
    },
  ],
};

export default config;
