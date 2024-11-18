const AlarmClockImage: React.FC<SVGProps> = ({
  classes,
  ...props
}: {
  classes?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 491.3 384"
    className={classes}
    {...props}
  >
    <defs>
      <style>{".cls-1{fill:#22272e}.cls-2{fill:#6dafa7}"}</style>
    </defs>
    <g id="Isolation_Mode" data-name="Isolation Mode">
      <path
        d="m100.28 275.53-22.55 24.68c-3.53 3.52-3.53 9.87 0 14.1a10.79 10.79 0 0 0 12.69 2.11l26.78-16.21ZM306.12 335.45l6.34 33.13c.71 4.94-2.11 10.58-7 12a9.73 9.73 0 0 1-12-5.64l-14.1-28.2Z"
        className="cls-1"
      />
      <circle cx={230.69} cy={210.68} r={153.67} className="cls-2" />
      <circle
        cx={230.59}
        cy={210.84}
        r={98.68}
        style={{
          fill: "#ffe779",
        }}
        transform="rotate(-45 230.583 210.84)"
      />
      <path
        d="m258.19 245.93-27.5-35.25 14.81-49.34"
        style={{
          fill: "none",
          stroke: "#63737a",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "12.69px",
        }}
      />
      <path
        d="M132.71 62a8.21 8.21 0 0 1-10.57-5.64 44.69 44.69 0 0 1 81.77-31c2.82 4.23.7 9.16-4.23 11.28ZM392.82 138.08a8.12 8.12 0 0 0 12 .7c14.1-15.51 15.51-38.77 2.11-56.39S371 59.83 352.64 69c-4.23 2.11-5.64 7.75-2.82 11.27ZM300.48 45.73 260.3 34.45C254 32.34 249.73 26 251.84 19c2.12-6.35 8.46-10.58 15.51-8.46l40.18 11.28c6.34 2.11 10.57 8.46 8.46 15.5-2.12 6.3-9.17 10.53-15.51 8.41Z"
        className="cls-2"
      />
      <path
        d="m256.647 66.266 11.015-37.913 29.107 8.457-11.015 37.912z"
        className="cls-2"
      />
    </g>
  </svg>
);
export default AlarmClockImage;
