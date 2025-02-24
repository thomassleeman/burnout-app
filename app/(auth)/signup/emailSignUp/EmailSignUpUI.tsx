"use client";

//React
import { useState, useEffect } from "react";
//next
import { useRouter } from "next/navigation";

//Firebase
import { auth } from "@/firebase/auth/appConfig";

//React Firebase hooks
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
  useDeleteUser,
} from "react-firebase-hooks/auth";
//errors
import { useErrors } from "@/hooks/useErrors";
//dependancies
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//functions
import addToDbIfNewUser from "../addToDbIfNewUser";
//components
import Spinner from "@/components/design/Spinner";

const signUpSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Character, e.g. ! or *"
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
});

let origin: String | undefined;
if (process.env.NODE_ENV === "development") {
  origin = process.env.NEXT_PUBLIC_DEV_ORIGIN;
} else {
  origin = process.env.NEXT_PUBLIC_PROD_ORIGIN;
}

console.log(
  "url:",
  `${process.env.NEXT_PUBLIC_PROD_ORIGIN}/signup/emailSignUp/confirmation`
);

//TODO: update url below for production
export default function EmailSignUpUI() {
  const { errors, addError } = useErrors();

  const [createUserWithEmailAndPassword, user, loading, createUserError] =
    useCreateUserWithEmailAndPassword(auth, {
      emailVerificationOptions: {
        url: `${origin}/signup/emailSignUp/confirmation`,
        handleCodeInApp: false,
      },
      sendEmailVerification: true,
    });

  const router = useRouter();

  const [deleteUser, deleteUserLoading, deleteUserError] = useDeleteUser(auth);

  const [authStateUser, authStateLoading, authStateError] = useAuthState(auth);

  const [updateProfile, updating, updateProfileError] = useUpdateProfile(auth);

  const [userCreated, setUserCreated] = useState(false);
  const [handleEmailSignupError, setHandleEmailSignupError] = useState<{
    message: string;
  } | null>(null);

  interface SignUpValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  /* ------- Handle submit --------------------------- */

  const handleSubmit = async (values: SignUpValues) => {
    const { name, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      setHandleEmailSignupError({
        message: "Passwords do not match",
      });
      return;
    }

    let userCred: any = null;

    try {
      // Create the user in Firebase Auth. This step will immediately create the account.
      userCred = await createUserWithEmailAndPassword(email, password);
      if (!userCred) {
        throw new Error("User creation failed");
      }

      // Update the profile with the provided name.
      await updateProfile({ displayName: name });
      // Add the user to your database.
      await addToDbIfNewUser(userCred.user);

      // If all steps succeed, mark the signup as complete.
      setUserCreated(true);
    } catch (error: any) {
      // If any error occurs after the user is created, delete the user from Firebase Auth.
      if (auth.currentUser) {
        try {
          await deleteUser();
        } catch (deleteError) {
          console.error(
            "Error deleting auth user created during incomplete email signup:",
            deleteError
          );
        }
      }

      // Set the error state for display.
      if (error && typeof error.message === "string") {
        addError(error.message);
      } else {
        addError("An unexpected error occurred.");
      }
    }
  };

  let error =
    createUserError ||
    authStateError ||
    updateProfileError ||
    handleEmailSignupError;

  useEffect(() => {
    if (error) {
      addError(error.message);
    }
  }, [error, addError]);

  /* -------------------------------------------------- */

  /* ------- Handle Loading --------------------------- */
  const anyLoading =
    loading || updating || deleteUserLoading || authStateLoading;

  /* ------- Content --------------------------- */
  let content;

  /* Success UI */
  if (userCreated) {
    router.push("/signup/email-sent");
    content = (
      <>
        <div className="flex">
          <Spinner className="mr-2" />
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
            onSubmit={async (values, { setSubmitting }) => {
              handleSubmit(values);
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
                    className="block w-full rounded-md border-0 px-4 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-700 sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-0 px-4 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-700 sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-0 px-4 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-700 sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-0 px-4 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-700 sm:text-sm sm:leading-6"
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
                  disabled={
                    isSubmitting ||
                    anyLoading ||
                    userCreated ||
                    errors.length > 0
                  }
                  className="flex w-full justify-center rounded-md bg-emerald-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:cursor-pointer hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:opacity-50"
                >
                  {!(isSubmitting || anyLoading) ? "Sign up" : <Spinner />}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  }

  return content;
}
