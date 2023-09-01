import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/* ----- CHECK IF USER IS ALREADY LOGGED IN ----- */
// TODO: Change origin for production

const redirectSignedInUsers = async () => {
  let origin = "";
  if (process.env.NODE_ENV === "production") {
    origin = "https://burnout-project.vercel.app/";
  } else {
    origin = "http://localhost:3000/";
  }
  const session = cookies().get("session");

  if (!session) {
    console.log("no session");
    return;
  }

  const responseAPI = await fetch(`${origin}/api/signin`, {
    method: "GET",
    headers: {
      Cookie: `session=${session?.value}`,
    },
    cache: "no-cache",
  });

  const status = responseAPI.status;

  if (status === 200) {
    console.log("redirect to dashboard");
    redirect("/dashboard");
  }
};

export default redirectSignedInUsers;
