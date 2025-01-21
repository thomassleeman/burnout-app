"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/auth/appConfig";
import * as Sentry from "@sentry/nextjs";
import Spinner from "@/app/_components/ui/_components/Spinner";
// import CancelButton from "./CancelButton";
import LogoUpload from "./LogoUpload";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const CreateOrganisationPage = () => {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [organisationCreated, setOrganisationCreated] = useState(false);
  const [organisationId, setOrganisationId] = useState("");
  const router = useRouter();
  const user = auth.currentUser;

  const handleCreateOrganisation = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!user) {
      // Redirect to sign-in page if user is not authenticated
      router.push("/signin");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("logo", logo!); // TS non-null assertion for logo

      const idToken = await user.getIdToken();

      const response = await fetch("/api/new-organisation", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Organisation created successfully
        console.log("data:", data);

        setOrganisationCreated(true);
        setOrganisationId(data.organisationId);
      } else {
        // Handle error
        console.error("Error creating organisation:", data.error);
        alert(`Error creating organisation: ${data.error}`);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto my-12 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <form onSubmit={handleCreateOrganisation}>
          <div className="space-y-12 sm:space-y-16">
            <div>
              <h2 className="text-3xl font-extralight text-gray-900">
                Create your Organisation
              </h2>

              <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <label
                    htmlFor="organisation-name"
                    className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5"
                  >
                    Organisation Name
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <input
                      id="organisation-name"
                      name="organisation-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isSubmitting}
                      placeholder=""
                      className="block w-full rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 focus:ring-2 focus:ring-inset focus:ring-emerald-700 disabled:bg-transparent sm:text-sm/6"
                    />
                  </div>
                </div>
                <LogoUpload logo={logo} setLogo={setLogo} />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            {/* <button
              type="button"
              className="text-sm/6 font-semibold text-gray-900"
            >
              Cancel
            </button> */}
            {/* <CancelButton /> */}
            {isSubmitting ? <Spinner size="medium" /> : null}
            {organisationCreated ? (
              <div>
                <div className="flex items-center gap-x-4">
                  <CheckCircleIcon className="h-9 w-9 text-emerald-500" />
                  <span className="text-lg font-light text-emerald-700">
                    Organisation Successfully Created
                  </span>
                </div>
                {organisationId ? (
                  <Link
                    href={`/organisation/${organisationId}`}
                  >{`Click here to go to the page for ${name}`}</Link>
                ) : (
                  <Spinner size="small" />
                )}
              </div>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                {isSubmitting ? "Creating..." : "Create Organisation"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrganisationPage;
