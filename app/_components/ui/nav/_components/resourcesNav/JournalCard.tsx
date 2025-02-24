import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import defaultImage from "@articles/defaultImage.jpeg";
import { journalOutlineFromSanity } from "@/types/journal";

type CloseResourcesNavFunction = () => void;

interface JournalCardProps {
  journal: journalOutlineFromSanity;
  closeResourcesNav?: CloseResourcesNavFunction;
}

const JournalCard = ({ journal, closeResourcesNav }: JournalCardProps) => {
  const { name, slug, headerImage, _id } = journal;
  const headerImageUrl = headerImage ? urlForImage(headerImage) : null;

  return (
    <article
      key={_id}
      className="relative isolate flex flex-none basis-64 snap-center snap-always flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
    >
      <button onClick={closeResourcesNav}>
        <Link
          href={`/journaling/${slug}`}
          className="flex h-64 w-64 flex-col rounded-lg outline-4 outline-offset-4 outline-purple-400/25 hover:outline sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
        >
          <div className="relative aspect-square flex-none overflow-hidden">
            <Image
              className="h-64 w-64 rounded-lg border-4 border-gray-700/25 bg-gray-100 object-cover"
              width={250}
              height={250}
              src={headerImageUrl || defaultImage}
              alt={`header image for the journal, ${name}`}
            />
            <div className="absolute bottom-3 left-0 w-11/12 rounded-r-lg bg-gray-800/50 px-5 py-2 drop-shadow-2xl">
              <h1 className="text-left text-lg text-white">{name}</h1>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-4"></div>
          </div>
        </Link>
      </button>
    </article>
  );
};

export default JournalCard;

// import Link from "next/link";
// import Image from "next/image";
// import { urlForImage } from "@/sanity/lib/image";
// import defaultImage from "@articles/defaultImage.jpeg";

// interface Journal {
//   name: string;
//   slug: string;
//   headerImage?: {
//     asset: {
//       _ref: string;
//       _type: "reference";
//     };
//   };
// }

// type CloseResourcesNavFunction = () => void;

// interface JournalCardProps {
//   journal: Journal;
//   closeResourcesNav?: CloseResourcesNavFunction;
// }

// const JournalCard = ({ journal, closeResourcesNav }: JournalCardProps) => {
//   const { name, slug, headerImage } = journal;
//   const headerImageUrl = headerImage ? urlForImage(headerImage) : null;
//   return (
//     <article
//       key={slug}
//       className="relative isolate flex flex-none basis-64 snap-center snap-always flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
//     >
//       <button onClick={closeResourcesNav}>
//         <Link
//           href={`/journaling/${slug}`}
//           className="flex h-full w-full flex-col rounded-lg outline-4 outline-offset-4 outline-purple-400/25 hover:outline sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
//         >
//           <div className="relative aspect-square flex-none overflow-hidden">
//             <Image
//               className="h-64 w-64 rounded-lg border-4 border-gray-700/25 bg-gray-100 object-cover"
//               width={250}
//               height={250}
//               src={headerImageUrl || defaultImage}
//               alt={`header image for the journal, ${name}`}
//             />
//             <div className="absolute bottom-3 left-0 w-11/12 rounded-r-lg  bg-gray-800/50 px-5 py-2 drop-shadow-2xl">
//               <h1 className="text-left text-lg text-white">{name}</h1>
//             </div>
//           </div>
//           <div>
//             <div className="flex items-center gap-x-4"></div>
//           </div>
//         </Link>
//       </button>
//     </article>
//   );
// };

// export default JournalCard;
