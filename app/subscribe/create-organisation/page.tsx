"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/auth/appConfig";

const CreateOrganisationPage = () => {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleCreateOrganisation = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      // Redirect to sign-in page if user is not authenticated
      router.push("/signin");
      return;
    }

    setIsSubmitting(true);

    try {
      const idToken = await user.getIdToken();

      const response = await fetch("/api/organisations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (response.ok) {
        // Organisation created successfully
        console.log("Organisation ID:", data.organisationId);
        // Redirect to the organisation dashboard or display a success message
        router.push(`/organisations/${data.organisationId}`);
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
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-light text-emerald-700">
        Create Organisation
      </h1>
      <form onSubmit={handleCreateOrganisation} className="mt-12">
        <div className="mb-4">
          <label
            htmlFor="organisation-name"
            className="block font-medium text-gray-700"
          >
            Organisation Name
          </label>
          <input
            type="text"
            id="organisation-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting}
            className="mt-1 block w-96 rounded-md border-0 border-gray-300 shadow-sm ring-2 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-700"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary mt-4 rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          {isSubmitting ? "Creating..." : "Create Organisation"}
        </button>
      </form>
    </div>
  );
};

export default CreateOrganisationPage;
