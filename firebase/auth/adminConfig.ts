import { initializeApp, getApps, cert } from "firebase-admin/app";

if (!process.env.NEXT_PUBLIC_FIREBASE_SECRET_KEY) {
  throw new Error(
    "The Firebase secret key is not set in the environment variables."
  );
}

let firebaseSecretKey = "";
if (process.env.NODE_ENV === "development") {
  if (process.env.NEXT_PUBLIC_FIREBASE_SECRET_KEY_L === undefined)
    throw new Error(
      "The Firebase secret key is not set in the environment variables."
    );
  firebaseSecretKey = process.env.NEXT_PUBLIC_FIREBASE_SECRET_KEY_L;
} else {
  firebaseSecretKey = JSON.parse(
    process.env.NEXT_PUBLIC_FIREBASE_SECRET_KEY as string
  );
}

const firebaseAdminConfig = {
  credential: cert(firebaseSecretKey),
};

export function adminInit() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}
