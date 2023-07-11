"use client";
//react
import { useEffect, useState } from "react";
//next
import Link from "next/link";
import { useRouter } from "next/navigation";
//Firebase
import { auth, db } from "@/firebase/auth/appConfig";
import { User } from "firebase/auth";
//Firestore
import { doc, setDoc, getDoc } from "firebase/firestore";
// Firebase hooks
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
//custom hooks
import useAddNewUserToDB from "./useAddNewUserToDB";
//dependencies
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//components
import GoogleButton from "@/components/design/GoogleButton";
import Spinner from "@/components/design/Spinner";
import ErrorAlert from "@/components/ui/ErrorAlert";

const signUpSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  //TODO: Uncomment this when we want to enforce password rules
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //   'Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Character, e.g. ! or *'
  // ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
});

const addNewUserToDB = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    const createdAt = new Date();
    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      providerData: user.providerData,
    };

    try {
      console.log("newUser: ", newUser);
      await setDoc(userRef, {
        newUser,
        createdAt,
        // ...any other fields to be included
      });
    } catch (error) {
      console.error("Error creating user document", error);
      return { error };
    }
  }
};

const EmailSignUpUI = () => {
  const router = useRouter();

  const [createUserWithEmailAndPassword, user, loading, createUserError] =
    useCreateUserWithEmailAndPassword(auth, {
      emailVerificationOptions: {
        url: "http://localhost:3000/signup/confirm",
        handleCodeInApp: false,
      },
      sendEmailVerification: true,
    });

  const [authStateUser, authStateLoading, authStateError] = useAuthState(auth);

  const [updateProfile, updating, updateProfileError] = useUpdateProfile(auth);

  //This is not working
  useEffect(() => {
    if (authStateUser?.emailVerified) {
      router.push("/dashboard");
    }
  }, [authStateUser, router]);

  const [userCreated, setUserCreated] = useState(false);

  interface SignUpValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const handleEmailSignup = async (values: SignUpValues) => {
    const { name, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      return;
    }

    const userCred = await createUserWithEmailAndPassword(email, password);
    if (!userCred) {
      return;
    }

    addNewUserToDB(userCred.user);

    // if (name) {
    //   await updateProfile({ displayName: name });
    // }

    if (userCred) {
      setUserCreated(true);
    }
  };

  const anyError = createUserError || authStateError || updateProfileError;

  let content;

  /* Error UI */
  if (anyError) {
    content = (
      <>
        <ErrorAlert error={anyError?.message} />
      </>
    );
  }

  /* Success UI */
  if (userCreated && !anyError) {
    content = (
      <>
        <div className="flex">
          <Spinner
            className={`mr-2 ${authStateLoading ? `block` : `hidden`}`}
          />
          <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Check your email
          </h2>
        </div>
        <div>
          <p className="mt-8 text-gray-900">
            We have sent you an email with a link to verify your account.
          </p>
        </div>
      </>
    );
  } else {
    /* Default UI */
    content = (
      <>
        <div>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={signUpSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleEmailSignup(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name:
                  <Field
                    type="text"
                    name="name"
                    className="block w-full rounded-md border-0 px-4 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </label>
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                  htmlFor="email"
                >
                  Email:
                  <Field
                    name="email"
                    className="block w-full rounded-md border-0 px-4 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="email"
                    required
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </label>
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                  htmlFor="password"
                >
                  Password:
                  <Field
                    name="password"
                    className="block w-full rounded-md border-0 px-4 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="password"
                    required
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </label>
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                  htmlFor="confirmPassword"
                >
                  Confirm Password:
                  <Field
                    name="confirmPassword"
                    className="block w-full rounded-md border-0 px-4 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="password"
                    required
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </label>
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {!(isSubmitting || loading) ? "Sign up" : <Spinner />}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  }

  return content;
};

export default function SignUp() {
  /* GOOGLE SIGN UP */
  const handleGoogleSignup = async () => {
    //TODO: add google login
  };

  const [authStateUser, authStateLoading, authStateError] = useAuthState(auth);

  return (
    <>
      <main className="min-h-screen">
        <div className="flex min-h-full flex-1">
          <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div className={`${authStateUser ? `hidden` : null}`}>
                <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign Up
                </h2>
              </div>

              <div className="mt-10">
                <EmailSignUpUI />

                <div className={`mt-10 ${authStateUser ? `hidden` : null}`}>
                  <div className="relative">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm font-medium leading-6">
                      <span className="bg-white px-6 text-gray-900">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <a
                      href="#"
                      className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
                    >
                      <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                      <span className="text-sm font-semibold leading-6">
                        Twitter
                      </span>
                    </a>
                    <button type="button" onClick={handleGoogleSignup}>
                      <GoogleButton />
                    </button>
                  </div>
                  {/* <ErrorAlert error={} /> */}
                </div>
              </div>
              <div
                className={`mt-12 w-full text-center ${
                  authStateUser ? `hidden` : null
                }`}
              >
                <p className="text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link className="text-blue-400" href="/signin">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="relative hidden w-0 flex-1 lg:block">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
              alt=""
            />
          </div>
        </div>
      </main>
    </>
  );
}
