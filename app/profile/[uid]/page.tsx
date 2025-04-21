import { Suspense } from "react";
import { verifyAuth } from "@actions/authAction";
import { AuthClaims } from "@/types/auth";
import ProfileContent from "./ProfileContent";
import Loading from "./loading";
import ErrorBoundary from "./components/ErrorBoundary";

export default function ProfilePage({ params }: { params: { uid: string } }) {
  console.log("params: ", params);
  return (
    <ErrorBoundary
      fallback={
        <div className="mt-8 text-red-600">
          Something went wrong loading the profile
        </div>
      }
    >
      <Suspense fallback={<Loading />}>
        <ProfilePageContent uid={params.uid} />
      </Suspense>
    </ErrorBoundary>
  );
}

async function ProfilePageContent({ uid }) {
  // Server-side auth verification
  const user = (await verifyAuth({ returnClaims: true })) as AuthClaims;

  // Check if user is viewing their own profile
  if (user.uid !== uid) {
    // redirect(`/profile/${user.uid}`);
    console.log("auth user: ", user.uid, "params user id: ", uid);
  }

  return <ProfileContent initialUserData={user} userId={uid} />;
}
