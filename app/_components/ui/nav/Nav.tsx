// app/_components/ui/nav/Nav.tsx
import { cookies } from "next/headers";
import { auth } from "firebase-admin";
import { adminInit } from "@/firebase/auth/adminConfig";
import Link from "next/link";
import Image from "next/image";
import brainLogo from "@/components/design/brainLogo.png";
import {
  HomeIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { getFirestore } from "firebase-admin/firestore";
import MobileMenuToggle from "./_components/MobileMenuToggle";
import UserIndicator from "./_components/UserIndicator";
import DropdownMenu from "./_components/DropDownMenu";
import ResourcesNav from "./_components/resourcesNav/NewResourcesNav";

// Navigation data structure
const navigation = {
  registeredUser: {
    mainNav: [{ id: "home", name: "Home", icon: "home", href: "/home" }],
    settingsNav: [{ id: "signout", name: "Sign Out", href: "/signout" }],
  },
  guest: [],
};

// Page indicator styles
const pageIndicator = {
  lg: {
    current:
      "border-green-700 text-gray-900 dark:text-slate-50 dark:border-emerald-300 drop-shadow-lg",
    default:
      "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-700 dark:text-slate-50",
  },
  sm: {
    current:
      "border-green-700 text-gray-900 dark:text-slate-50 dark:border-emerald-300 drop-shadow-lg",
    default:
      "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-700 dark:text-slate-50",
  },
};

async function getUserData() {
  const session = cookies().get("session");

  if (!session) return null;

  try {
    adminInit();
    const decodedClaims = await auth().verifySessionCookie(session.value, true);

    const db = getFirestore();
    const userDoc = await db.collection("users").doc(decodedClaims.uid).get();
    const userData = userDoc.data();

    return {
      uid: decodedClaims.uid,
      displayName: decodedClaims.name || "User",
      email: decodedClaims.email,
      // organisation: userData?.organisation || null,
    };
  } catch (error) {
    console.error("Error verifying session:", error);
    return null;
  }
}

export default async function Nav({ pathname }: { pathname: string }) {
  const user = await getUserData();
  const isGuestPath =
    pathname === "/" || pathname === "/signup" || pathname === "/signin";

  if (isGuestPath) {
    return (
      <div className="max-h-fit shadow">
        <div className="mx-auto my-1 px-2 sm:px-4 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex px-2 lg:px-0">
              <div className="flex flex-shrink-0 items-center gap-x-4">
                <Image
                  className="h-5/6 w-auto pr-12 drop-shadow-lg"
                  src={brainLogo}
                  alt="MindHub Logo"
                />
              </div>
              <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                <Link
                  className="inline-flex items-center justify-self-end px-1 pt-1 text-sm font-medium text-green-700 hover:text-green-900"
                  href="/signup"
                >
                  Sign up for a free account
                </Link>
              </div>
            </div>

            <Link
              href="/signin"
              className="mx-2 self-center justify-self-end rounded-lg border border-slate-600 bg-transparent px-2 py-1 text-slate-600"
            >
              login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Logged-in user view
  // const organisation = user?.organisation || {
  //   joined: { seconds: 0, nanoseconds: 0 },
  //   name: "",
  //   organisationId: "",
  //   role: "",
  // };

  return (
    <nav className="z-40 bg-transparent shadow dark:border-pink-700 dark:text-slate-50">
      <div className="mx-auto my-1 px-2 sm:px-4 lg:px-8">
        <div className="flex h-16 justify-between">
          {/* Logo and page links */}
          <div className="flex lg:px-0">
            <div className="mr-4 flex flex-shrink-0 items-center gap-x-4">
              <Link href="/home" className="m-2 h-12 lg:h-14">
                <Image
                  className="h-full w-auto drop-shadow-lg"
                  src={brainLogo}
                  alt="MindHub Logo"
                />
              </Link>
            </div>
            <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
              {navigation.registeredUser.mainNav.map((page) => (
                <Link
                  key={page.id}
                  href={page.href}
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    pathname === page.href
                      ? pageIndicator.lg.current
                      : pageIndicator.lg.default
                  }`}
                >
                  {page.icon === "home" ? (
                    <HomeIcon className="h-6 w-6" />
                  ) : (
                    page.name
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop options */}
          <div className="hidden gap-x-6 lg:ml-4 lg:flex lg:items-center">
            <ResourcesNav />
            <DropdownMenu
              // organisation={organisation}
              settingsNav={navigation.registeredUser.settingsNav}
            />
            <UserIndicator user={user} />
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <MobileMenuToggle
              navigation={navigation.registeredUser}
              pageIndicator={pageIndicator}
              pathname={pathname}
              user={user}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
