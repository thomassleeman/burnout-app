import Link from "next/link";
import ProfileSection from "./components/ProfileSection";
import ProfileField from "./components/ProfileField";
import DangerZone from "./components/DangerZone";

interface ProfileContentProps {
  firestoreUser: UserData;
  userId: string;
}

export default function ProfileContent({
  firestoreUser,
  userId,
}: ProfileContentProps) {
  // Get provider data from Firestore
  const providerData = firestoreUser.providerData?.[0];

  // Check if the user is an organisation Admin
  const organisationAdmin = firestoreUser.organisation?.role === "admin";

  // Calculate days since account creation
  const daysSince = () => {
    if (!firestoreUser.createdAt) return "N/A";

    // Convert Firestore timestamp to Date
    const creationDate = new Date(
      firestoreUser.createdAt.seconds * 1000 +
        (firestoreUser.createdAt.nanoseconds || 0) / 1_000_000
    );

    const now = new Date();
    const diffInMilliseconds = now.getTime() - creationDate.getTime();
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    return Math.floor(diffInDays);
  };

  // Format the creation timestamp for display
  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return "N/A";

    const date = new Date(
      timestamp.seconds * 1000 + (timestamp.nanoseconds || 0) / 1_000_000
    );

    return date.toLocaleString();
  };

  if (!firestoreUser || !providerData) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center gap-y-7">
        <h2 className="text-3xl text-red-600 dark:text-slate-200">
          Error: Unable to load user data
        </h2>
      </div>
    );
  }

  return (
    <main className="mt-8 md:mt-12">
      <ProfileSection title="Personal Information">
        <ProfileField label="Name" value={providerData.displayName || "N/A"} />

        <ProfileField
          label="Email address"
          value={firestoreUser.email || "N/A"}
        />

        <ProfileField
          label="Account created"
          value={formatTimestamp(firestoreUser.createdAt)}
        />

        <ProfileField label="Member for" value={`${daysSince()} days`} />

        {firestoreUser.organisation && organisationAdmin && (
          <ProfileField
            label="Organisation"
            value={
              <Link
                href={`/organisation/${firestoreUser.organisation.organisationId}`}
                className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
              >
                {firestoreUser.organisation.name}
              </Link>
            }
          />
        )}

        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="font-medium leading-6 text-emerald-900 hover:text-emerald-700">
            <Link
              className="rounded-md border border-gray-400 px-3 py-2 text-emerald-500 hover:bg-emerald-50"
              href="/signin/resetpassword"
            >
              Reset Password
            </Link>
          </dt>
        </div>
      </ProfileSection>

      <DangerZone userId={userId} />
    </main>
  );
}
