import Image from 'next/image';
export default function FourOOne() {
  return (
    <>
      <div className="flex">
        <h1 className="text-4xl">
          401: Unauthorized {/* Why isn't this animation working!? */}
        </h1>
        <div className="flex">
          <h1 className="ml-3 animate-wave text-5xl">☝</h1>
        </div>

        {/* <Image
        src="/magicWord.jpeg"
        alt="You didn't say the magic word."
        width={500}
        height={500}
        className="mt-8 rounded-lg"
      /> */}
      </div>
      <p>(You didn&apos;t say the magic word)</p>
    </>
  );
}
