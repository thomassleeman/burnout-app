import {
  initializeApp,
  getApps,
  cert,
  applicationDefault,
} from "firebase-admin/app";

// export function adminInit() {
//   initializeApp({
//     credential: applicationDefault(),
//   });
// }

// const firebaseAdminConfig = {
//   // credential: cert({
//   //   project_id: process.env.FIREBASE_PROJECT_ID,
//   //   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//   //   privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(
//   //     /\\n/g,
//   //     '\n'
//   //   ),
//   // }),
//   credential: cert({
//     projectId: 'burnout-project',
//     privateKey:
//       '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDHyO8nm+OMO74N\nCA60TvAWoDgBFHM2AElVufRFKpOT+yESvzJx9Jx8pJ8ztkIgWEfN07G57mILV61f\nbtbgv+0GvmyCIGT11R/KfA1L9HoQm0f/pv2lbs1RbnYKLe7gkjvGu/PJOz82lTaK\nsy8XcXFZb9AhDdxWofVqZb6Lcux3zRNZUra+OgZRHu2GK5SLw1vzwlmCNvySMYQh\n4wNAqZw1o95REPKwzWJpe9ikkOUCoBla9hbQFn2fffO3isp3uvUIMOyxqGHfumQk\nn95g5abd7uzCmziLq+iQT9OpbjOxmW9ZjJOn6SNCfl9CCdKFiWzKk4raSIipsb2f\ndDsE6ZIRAgMBAAECggEABJ1sv9WbJqPBJsApRcs+gslJ7eV06VoNl547aSccAFq4\nV3xk7Aq2XC850bobsi9T3kpt9DFwYJpyge43prqsPSAENefNaTvWd4kQzhC8Spqp\nqbtH5+zEr6U9cwv/VP7vxE4Wai81DTvaZg8QTwpy77nUXRUawkIMvxvRUFuT4IsI\n0zL5bDYjsPNZHIEkbAZ1oY01XyVUuLNJuo7jTNGe69eriOXRYaKdwCgoPIZOgp6w\n5eJPGkhUmoYHcufER/t3E+TvlzL4WxD4jFUdY3CQg9JfHz1IBhVR5twKZ5LekZv6\nNdjNs/kj5A91NthVI2W83p750se+oARWQM28560gQQKBgQD2YkFbsa3rnmnh6CmM\nkaOcChphCEoDbbDdE8eBWDGhXPeYglAb0K0U8doKx7VtVVCpaKtHASayz0J9W4ic\n/2edxql0BK6z2ChRVMCBah+9uWmckU6V+EqPBLPRQEfQ37p27xxWBMQsrz3SpYFV\n+dDoAnSlE9wDNcFWmozOdtOWIQKBgQDPlRXxbypxY+CvOkd1zUollW2PBfNWRT5Q\nHsP1HdAQEzAmrmqMxjYtrBHEnatJ3NYabmu0VbkAS6z/iKLgwtZCHuyeTJ5wk2fH\nTHk1gveMyieZA8ODCjOBIJPIz+ApyymYoLfOEUGw+gy8gDNYotMAYJJRxGIYYT0Q\n29sbkced8QKBgCvBoWfec0vQE2/aYl6jktHofWzUIwje1zU8CQdwmUfWEebU5dM6\nyTJaDWYyt4bWSv/7JcfzbWL+KgnHUsjHFyjPGlMPbdNkxSxEh/ez2DVCk34J1FIQ\nCXXC2QiFiPuQcDYlGvwv1oM1EB6z4/dX6YD6xqp2j3FGf7KYuf8E3WjhAoGBAMOP\nE04RyW1rh6ftApdzYHAJ114PYBCdSTgX08pfXL1YJlu6ozyeGzppyY9ubok2WCos\nbqFExPYHVSKjabbPNySxl38GdZle9TznyaTlDiv/4tAfoJgaCy2SMEfVtrwI3tYg\nSykCTt3YpBkNudG+C4RmdlI77aJEMVBpn4DYlLMxAoGAUlVJU5A8YZ/GK3U3gmty\nHLB+P0w8k8ZhDCbJHsxCb/1dFcX4cLTrITL7aCCXfZYEzXQSGZbb4IamaeVjSo8N\n9rDpKeRAg0TpAyqkBhCCPu7BxF4sLJPCZr5oOHPEHSLd4Dy2JKgEcV5jhVOzTIWb\nj4cD7BE1HqHJUAjRCsWrUQU=\n-----END PRIVATE KEY-----\n',
//     clientEmail:
//       'firebase-adminsdk-7fa5o@burnout-project.iam.gserviceaccount.com',
//   }),
// };

// export function adminInit() {
//   if (getApps().length <= 0) {
//     initializeApp(firebaseAdminConfig);
//   }
// }

// import * as admin from 'firebase-admin';

// export function adminInit() {
//   if (!admin.apps.length) {
//     admin.initializeApp({
//       credential: admin.credential.cert({
//         privateKey:
//           '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDHyO8nm+OMO74N\nCA60TvAWoDgBFHM2AElVufRFKpOT+yESvzJx9Jx8pJ8ztkIgWEfN07G57mILV61f\nbtbgv+0GvmyCIGT11R/KfA1L9HoQm0f/pv2lbs1RbnYKLe7gkjvGu/PJOz82lTaK\nsy8XcXFZb9AhDdxWofVqZb6Lcux3zRNZUra+OgZRHu2GK5SLw1vzwlmCNvySMYQh\n4wNAqZw1o95REPKwzWJpe9ikkOUCoBla9hbQFn2fffO3isp3uvUIMOyxqGHfumQk\nn95g5abd7uzCmziLq+iQT9OpbjOxmW9ZjJOn6SNCfl9CCdKFiWzKk4raSIipsb2f\ndDsE6ZIRAgMBAAECggEABJ1sv9WbJqPBJsApRcs+gslJ7eV06VoNl547aSccAFq4\nV3xk7Aq2XC850bobsi9T3kpt9DFwYJpyge43prqsPSAENefNaTvWd4kQzhC8Spqp\nqbtH5+zEr6U9cwv/VP7vxE4Wai81DTvaZg8QTwpy77nUXRUawkIMvxvRUFuT4IsI\n0zL5bDYjsPNZHIEkbAZ1oY01XyVUuLNJuo7jTNGe69eriOXRYaKdwCgoPIZOgp6w\n5eJPGkhUmoYHcufER/t3E+TvlzL4WxD4jFUdY3CQg9JfHz1IBhVR5twKZ5LekZv6\nNdjNs/kj5A91NthVI2W83p750se+oARWQM28560gQQKBgQD2YkFbsa3rnmnh6CmM\nkaOcChphCEoDbbDdE8eBWDGhXPeYglAb0K0U8doKx7VtVVCpaKtHASayz0J9W4ic\n/2edxql0BK6z2ChRVMCBah+9uWmckU6V+EqPBLPRQEfQ37p27xxWBMQsrz3SpYFV\n+dDoAnSlE9wDNcFWmozOdtOWIQKBgQDPlRXxbypxY+CvOkd1zUollW2PBfNWRT5Q\nHsP1HdAQEzAmrmqMxjYtrBHEnatJ3NYabmu0VbkAS6z/iKLgwtZCHuyeTJ5wk2fH\nTHk1gveMyieZA8ODCjOBIJPIz+ApyymYoLfOEUGw+gy8gDNYotMAYJJRxGIYYT0Q\n29sbkced8QKBgCvBoWfec0vQE2/aYl6jktHofWzUIwje1zU8CQdwmUfWEebU5dM6\nyTJaDWYyt4bWSv/7JcfzbWL+KgnHUsjHFyjPGlMPbdNkxSxEh/ez2DVCk34J1FIQ\nCXXC2QiFiPuQcDYlGvwv1oM1EB6z4/dX6YD6xqp2j3FGf7KYuf8E3WjhAoGBAMOP\nE04RyW1rh6ftApdzYHAJ114PYBCdSTgX08pfXL1YJlu6ozyeGzppyY9ubok2WCos\nbqFExPYHVSKjabbPNySxl38GdZle9TznyaTlDiv/4tAfoJgaCy2SMEfVtrwI3tYg\nSykCTt3YpBkNudG+C4RmdlI77aJEMVBpn4DYlLMxAoGAUlVJU5A8YZ/GK3U3gmty\nHLB+P0w8k8ZhDCbJHsxCb/1dFcX4cLTrITL7aCCXfZYEzXQSGZbb4IamaeVjSo8N\n9rDpKeRAg0TpAyqkBhCCPu7BxF4sLJPCZr5oOHPEHSLd4Dy2JKgEcV5jhVOzTIWb\nj4cD7BE1HqHJUAjRCsWrUQU=\n-----END PRIVATE KEY-----\n',
//         projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//         clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
//       }),
//       // databaseURL: '<DATABASE_URL>',
//     });
//   }
// }

const firebaseSecretKey = process.env.NEXT_PUBLIC_FIREBASE_SECRET_KEY;
if (!firebaseSecretKey) {
  throw new Error(
    "The Firebase secret key is not set in the environment variables."
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
