const sizeMap = {
  small: "h-5 w-5 border-4",
  medium: "h-8 w-8 border-8",
  large: "h-12 w-12 border-8",
};

export default function Spinner({
  size = "medium",
}: {
  size: keyof typeof sizeMap;
}) {
  return (
    <div
      className={`inline-block animate-spin rounded-full ${sizeMap[size]} border-b-emerald-600/75 border-l-emerald-500/50 border-r-emerald-700 border-t-transparent`}
    />
  );
}
