interface MarqueeProps {
  title: string;
  subtext: string;
  classes: string;
}

export default function Marquee(props: MarqueeProps) {
  const { title, subtext, classes } = props;
  const key = `${title}-${subtext}-${classes}`; // Create a unique key based on the props

  return (
    <div className={`relative flex overflow-hidden ${classes}`}>
      <div key={key} className="animate-marquee whitespace-nowrap">
        <span className=" ml-4">{title}</span>
        <span className="mx-2 text-sm font-light">{`- ${subtext}`}</span>
      </div>

      <div
        key={`${key}2`}
        className="absolute top-0 animate-marquee2 whitespace-nowrap"
      >
        <span className="ml-4">{title}</span>
        <span className="mx-2 text-sm font-light">{`- ${subtext}`}</span>
      </div>
    </div>
  );
}
