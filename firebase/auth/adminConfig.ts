import {
  initializeApp,
  getApps,
  cert,
  applicationDefault,
} from "firebase-admin/app";

if (!process.env.NEXT_PUBLIC_FIREBASE_SECRET_KEY) {
  throw new Error(
    "The Firebase secret key is not set in the environment variables."
  );
}

let firebaseSecretKey = "";
if (process.env.NODE_ENV === "development") {
  firebaseSecretKey = process.env.NEXT_PUBLIC_FIREBASE_SECRET_KEY;
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

// Ensure the environment variable is defined
// if (!process.env.NEXT_PUBLIC_FIREBASE_SECRET_KEY) {
//   throw new Error(
//     "The NEXT_PUBLIC_FIREBASE_SECRET_KEY environment variable is not defined"
//   );
// }

// let str = process.env.NEXT_PUBLIC_FIREBASE_SECRET_KEY;

// //Remove outermost quotes
// if (str[0] === '"' && str[str.length - 1] === '"') {
//   str = str.substring(1, str.length - 1);
// }

// // Replace \\n with \n
// str = str.replace(/\\n/g, "\n");

// // Replace all \" with "
// str = str.replace(/\\"/g, '"');

// // Parse the fixed JSON string to an object
// const firebaseSecretKey = JSON.parse(str);

// // The rest of your existing code...
// const firebaseAdminConfig = {
//   credential: cert(firebaseSecretKey),
// };

// export function adminInit() {
//   if (getApps().length <= 0) {
//     initializeApp(firebaseAdminConfig);
//   }
// }
