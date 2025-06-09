import { verifyAuth } from "@/app/actions/authAction";
import { redirect } from "next/navigation";
import { getFirestoreUser } from "@/app/actions/dbUserAction";
import WelcomePanel from "./_components/WelcomePanel";
import CurrentActivityPanels from "./_components/CurrentActivityPanels";

import Anouncements from "./_components/Announcements";
import Calendar from "./_components/Calendar";
import ContentCarousel from "@articles/_components/ContentCarousel";
import Visualisations from "./_components/Visualisations";

import { serialiseData } from "@/utils/serialiseData";

import {
  getSortedLimitedArticlesData,
  getRecommendedArticlesData,
} from "@articles/getArticlesData";

export const revalidate = 60 * 60 * 12;

export default async function Home({ params }: { params: { uid: string } }) {
  const authUser = await verifyAuth({ returnClaims: true });
  if (!authUser) {
    redirect("/signin");
  }

  if (authUser.uid !== params.uid) {
    redirect(`/home/${authUser.uid}`);
  }

  const firestoreUser = await getFirestoreUser(params.uid);

  if (!firestoreUser) {
    redirect("/error");
  }

  const latestArticles = await getSortedLimitedArticlesData("date", "desc", 10);

  return (
    <>
      <div className="">
        <main className="pb-8 sm:mt-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Dashboards</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-14 lg:col-span-2">
                {/* Welcome panel */}
                <WelcomePanel user={firestoreUser} />
                <CurrentActivityPanels user={firestoreUser} />
                <Visualisations user={firestoreUser} />
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-14">
                <Anouncements user={firestoreUser} />
                <Calendar user={serialiseData(firestoreUser)} />
              </div>
            </div>
          </div>
          <div className="mx-1 mt-14 sm:mx-0">
            <ContentCarousel
              carouselTitle="Latest Articles"
              carouselTagline="Read the latest articles from our library."
              articles={latestArticles}
            />
          </div>
        </main>
      </div>
    </>
  );
}
