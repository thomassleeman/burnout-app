import { initializeApp, getApps, cert } from "firebase-admin/app";

if (!process.env.FIREBASE_SECRET_KEY) {
  throw new Error(
    "The Firebase secret key is not set in the environment variables."
  );
}

let firebaseSecretKey = "";

if (process.env.FIREBASE_SECRET_KEY === undefined) {
  throw new Error(
    "The Firebase secret key is not set in the environment variables."
  );
}

firebaseSecretKey = JSON.parse(process.env.FIREBASE_SECRET_KEY);

const firebaseAdminConfig = {
  credential: cert(firebaseSecretKey),
};

export function adminInit() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}
