interface MarqueeProps {
  title: string;
  subtext: string;
  classes: string;
}

export default function Marquee(props: MarqueeProps) {
  const { title, subtext, classes } = props;
  return (
    <div className={`relative flex overflow-hidden border ${classes}`}>
      <div className="animate-marquee whitespace-nowrap">
        <span className=" ml-4 font-bold">{title}</span>
        <span className="mx-2">{subtext}</span>
      </div>

      <div className="absolute top-0 animate-marquee2 whitespace-nowrap">
        <span className="ml-4 font-bold">{title}</span>
        <span className="mx-2">{subtext}</span>
      </div>
    </div>
  );
}
