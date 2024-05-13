interface MarqueeProps {
  title: string;
  subtext: string;
  classes: string;
}

export default function Marquee(props: MarqueeProps) {
  const { title, subtext, classes } = props;
  return (
    <div className={`relative flex overflow-hidden ${classes}`}>
      <div className="animate-marquee whitespace-nowrap">
        <span className=" ml-4 text-sm font-light">{title}</span>
        <span className="mx-2 text-sm font-light">{`- ${subtext}`}</span>
      </div>

      <div className="absolute top-0 animate-marquee2 whitespace-nowrap">
        <span className="ml-4 text-sm font-light">{title}</span>
        <span className="mx-2 text-sm font-light">{`- ${subtext}`}</span>
      </div>
    </div>
  );
}
