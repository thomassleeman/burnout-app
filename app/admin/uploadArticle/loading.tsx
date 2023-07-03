const Skeleton = () => {
  return (
    <div className="mx-auto mt-20 h-24 w-60 rounded-md border-2">
      <div className="flex h-full animate-pulse flex-row items-center justify-center space-x-5">
        <div className="h-12 w-12 rounded-full bg-gray-300 "></div>
        <div className="flex flex-col space-y-3">
          <div className="h-6 w-36 rounded-md bg-gray-300 "></div>
          <div className="h-6 w-24 rounded-md bg-gray-300 "></div>
        </div>
      </div>
    </div>
  );
};

export default function Loading() {
  return (
    <div className="my-10 flex flex-col items-center justify-center py-2">
      <h1 className="mb-5 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-3xl text-transparent md:mb-10 md:text-5xl">
        Upload Article
      </h1>
      <div className="flex w-full flex-col items-center justify-center">
        <Skeleton />
      </div>
    </div>
  );
}
