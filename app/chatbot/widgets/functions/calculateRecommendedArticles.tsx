import { AssessmentScores } from "@/types/chatbot";

export default function calculateRecommendedArticles(
  assessmentScores: AssessmentScores
) {
  const recommendedTitles = [];

  //burnout signs: distracted
  if (assessmentScores.cognitiveImpairment >= 5) {
    recommendedTitles.push("thinking-clearer-and-more-creatively");
  }
  //Burnout Signs: Emotional
  if (assessmentScores.emotionalImpairment >= 5) {
    recommendedTitles.push(
      "why-emotions-matter-even-at-work",
      "managing-reactions-and-problematic-anger"
    );
  }
  //Burnout Signs: Exhaustion
  if (assessmentScores.exhaustion >= 5) {
    recommendedTitles.push(
      "how-to-beat-exhaustion-at-work",
      "how-to-get-effective-rest"
    );
  }
  //burnout signs: Detachment
  if (assessmentScores.detachment >= 5) {
    recommendedTitles.push("navigating-detachment-in-the-workplace");
  }
  return recommendedTitles;
}
