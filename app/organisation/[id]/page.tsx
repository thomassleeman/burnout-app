"use client";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/firebase/auth/appConfig";
import Spinner from "@/app/_components/ui/_components/Spinner";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import {
  ExclamationCircleIcon,
  ClipboardDocumentIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export default function OrganisationPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [org, setOrg] = useState<Organisation | null>(null);

  const [invitationLink, setInvitationLink] = useState<string | null>(null);
  const [invitationTokenExpired, setInvitationTokenExpired] = useState(false);
  const [copied, setCopied] = useState(false);
  const { id } = params;

  const daysSince = (firebaseTimestamp: {
    seconds: number;
    nanoseconds: number;
  }) => {
    const date = new Date(
      firebaseTimestamp.seconds * 1000 +
        firebaseTimestamp.nanoseconds / 1_000_000
    );
    const now = new Date();
    const diffInMilliseconds = now.getTime() - date.getTime();
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    return Math.floor(diffInDays);
  };

  useEffect(() => {
    const getOrganisation = async (id: string) => {
      try {
        const orgRef = doc(db, "organisations", id);
        const orgSnapshot = await getDoc(orgRef);

        if (orgSnapshot.exists()) {
          const data = orgSnapshot.data();
          setOrg(data as Organisation);

          // If there's a joinToken, check if it's expired
          if (data.joinToken?.token) {
            const { token, expiresAt } = data.joinToken;
            // Firestore timestamps are objects with seconds & nanoseconds.
            // Convert it to a Date object
            const expiryDate = new Date(
              expiresAt.seconds * 1000 + expiresAt.nanoseconds / 1_000_000
            );

            if (expiryDate < new Date()) {
              // Token is expired
              setInvitationTokenExpired(true);
            } else {
              // Not expired; reconstruct the invitation link
              const existingLink = `${window.location.origin}/subscribe/invitation?org=${id}&token=${token}`;
              setInvitationLink(existingLink);
            }
          }

          setLoading(false);
        } else {
          console.log("No such document!");
        }
      } catch (error: any) {
        console.error("Error fetching organisation:", error);
        if (error.code === "permission-denied") {
          router.push("/401");
        }
      }
    };

    getOrganisation(id);
  }, [id, router]);

  const createInvitationLink = async () => {
    if (!id) return;

    const token = uuidv4(); // Generate a unique token
    const link = `${window.location.origin}/subscribe/invitation?org=${id}&token=${token}`;
    // Set expiry 14 days from now
    const expires = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

    try {
      const orgRef = doc(db, "organisations", id);
      await setDoc(
        orgRef,
        {
          joinToken: {
            createdAt: new Date(),
            expiresAt: expires,
            token,
            valid: true,
          },
        },
        { merge: true }
      );

      setInvitationLink(link);
      setInvitationTokenExpired(false); // reset if we had a previously expired token
      navigator.clipboard.writeText(link); // Copy to clipboard
      console.log("Invitation link:", link);
    } catch (error) {
      console.error("Error creating invitation link:", error);
    }
  };

  const handleClickCopy = async () => {
    if (!invitationLink) return;
    try {
      await navigator.clipboard.writeText(invitationLink);
      setCopied(true);
      // Revert after 1.5 seconds, for example
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  if (loading) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center gap-y-7">
        <div className="flex items-center gap-x-6">
          <Spinner size="medium" />
          <h2 className="text-3xl text-emerald-700 dark:text-slate-200">
            Loading...
          </h2>
        </div>
      </div>
    );
  }
  if (!loading && org === null) {
    throw Error("Organisation not found");
  }

  return (
    <main className="mt-8 md:mt-12">
      <section className="mb-12">
        <div className="flex items-center gap-x-12 px-4 sm:px-0">
          <h3 className="text-3xl font-semibold leading-7 text-gray-900">
            {org?.name}
          </h3>
          {org?.logoUrl ? (
            <Image
              src={org?.logoUrl}
              alt={`Logo for the organisation ${org?.name}`}
              height={40}
              width={40}
              className="h-32 w-auto"
            />
          ) : null}
        </div>
        <div className="mt-6 border-t border-gray-300">
          <dl className="divide-y divide-gray-100">
            {/* Owner */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Owner
              </dt>
              <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">{org?.ownerEmail}</span>
              </dd>
            </div>

            {/* Created */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Created
              </dt>
              <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">
                  {org?.createdAt ? daysSince(org.createdAt) : "Loading..."}{" "}
                  days ago
                </span>
              </dd>
            </div>

            {/* Seats */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Seats
              </dt>
              <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">{org?.subscriptionQuantity}</span>
              </dd>
            </div>

            {/* Invitation Button */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="font-medium leading-6 text-emerald-800 hover:text-emerald-700">
                <button
                  onClick={createInvitationLink}
                  className="rounded-md bg-emerald-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:border-emerald-600 hover:bg-emerald-800"
                >
                  Create new invitation link
                </button>
              </div>
              <div className="flex gap-x-3 text-sm text-gray-800">
                <ExclamationCircleIcon className="h-8 w-8 text-red-400" />
                <p>
                  Creating a new invitation link will invalidate any existing
                  link.
                </p>
              </div>
            </div>

            {/* Display Invitation Link */}
            {/* {invitationLink && (
              <div>
                <div className="mt-6 flex items-center gap-x-6 text-gray-600">
                  <span>Invitation Link:</span>
                  <span className="font-semibold text-emerald-600">
                    {invitationLink}
                  </span>
                </div>
                <p className="mt-6">
                  Share this link with your colleagues to enable them to create
                  an account within your organisation. Invitation links are
                  valid for 14 days after which you will need to create a new
                  one.
                </p>
              </div>
            )} */}

            {invitationLink && (
              <div>
                <div className="mt-6 flex items-center gap-x-4 text-gray-600">
                  <span className="whitespace-nowrap">Invitation Link:</span>
                  <span className="font-semibold text-emerald-600">
                    {invitationLink}
                  </span>
                  {/* Copy icon or tick icon */}
                  <div>
                    {copied ? (
                      <CheckIcon
                        className="h-6 w-6 cursor-pointer text-green-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <ClipboardDocumentIcon
                        onClick={handleClickCopy}
                        className="h-6 w-6 cursor-pointer text-gray-600 hover:text-emerald-600"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>
                <p className="mt-6 text-sm text-gray-700">
                  Share this link with your colleagues to enable them to create
                  an account within your organisation. Invitation links are
                  valid for <strong>14 days</strong>, after which you will need
                  to create a new one.
                </p>
              </div>
            )}

            {/* Show if invitation token is expired */}
            {invitationTokenExpired && (
              <div className="mt-4 text-sm text-red-600">
                Your invitation link has expired. Please create a new one.
              </div>
            )}
          </dl>
        </div>
      </section>
    </main>
  );
}
