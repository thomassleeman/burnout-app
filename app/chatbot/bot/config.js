import ResponseOptions from "../widgets/ResponseOptions";
import LinkButton from "../widgets/LinkButton";
import InitialAssessmentHandler from "../widgets/InitialAssessmentHandler";
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
  },
  widgets: [
    {
      widgetName: "ResponseOptions",
      widgetFunc: (props) => <ResponseOptions {...props} />,
      mapStateToProps: ["initialAssessmentScores", "lastUpdated"],
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
  ],
};

export default config;
