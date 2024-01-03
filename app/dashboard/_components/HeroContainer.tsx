import CheckInPrompt from "./CheckInPrompt";
import IntroCoursePrompt from "./IntroCoursePrompt";
import { CheckInPromptSkeleton } from "./CheckInPrompt";

const cards = [
  {
    id: 1,
    footer: "Card 1",
    href: "#",
    component: <CheckInPrompt />,
    skeleton: <CheckInPromptSkeleton />,
  },
  {
    id: 2,
    footer: "Card 2",
    href: "#",
    component: <IntroCoursePrompt />,
    skeleton: <CheckInPromptSkeleton />,
  },
];

export default function HeroContainer() {
  return (
    // <div className="grid gap-6 md:grid-cols-2 md:gap-16">
    <div className="grid grid-rows-2 gap-6 md:grid-cols-2 md:grid-rows-1 md:gap-16">
      {cards.map((card) => {
        return (
          <div key={card.id} className="mx-2 overflow-hidden ">
            {card.component}
          </div>
        );
      })}
    </div>
  );
}

export function HeroContainerSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-16">
      {cards.map((card) => {
        return (
          <div key={card.id} className="mx-2 overflow-hidden">
            {card.skeleton}
          </div>
        );
      })}
    </div>
  );
}
