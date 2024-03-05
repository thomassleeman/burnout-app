"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function userIdAction() {
  const cookieStore = cookies();
  const session = cookieStore.get("session");

  const origin = `${
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_PROD_ORIGIN
      : process.env.NEXT_PUBLIC_DEV_ORIGIN
  }`;

  if (!session) {
    redirect("/signin");
  }

  const responseAPI = await fetch(`${origin}/api/signin`, {
    method: "GET",
    headers: {
      Cookie: session?.value,
    },
  });

  //If session cookie verification fails the endpoint will delete the cookie. Here we redirect the user to sign in.
  if (responseAPI.status !== 200) {
    redirect("/signin");
  }

  // Get the signed-in user's UID from the response
  const signedInUser = await responseAPI.json();
  const signedInUserUid = signedInUser.decodedClaims.uid;

  return signedInUserUid;
}
