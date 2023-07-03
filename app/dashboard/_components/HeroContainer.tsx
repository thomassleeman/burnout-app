import CheckInPrompt from './CheckInPrompt';
import IntroCoursePrompt from './IntroCoursePrompt';

const cards = [
  { id: 1, footer: 'Card 1', href: '#', component: <CheckInPrompt /> },
  { id: 2, footer: 'Card 2', href: '#', component: <IntroCoursePrompt /> },
];

export default function HeroContainer() {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-16">
      {cards.map((card) => {
        return (
          <div
            key={card.id}
            className="mx-2 h-96 overflow-hidden rounded-lg bg-white shadow lg:h-80"
          >
            {card.component}
          </div>
        );
      })}
    </div>
  );
}
