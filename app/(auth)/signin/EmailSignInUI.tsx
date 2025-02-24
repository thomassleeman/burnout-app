"use client";
//react
import { useEffect } from "react";
//next
import Link from "next/link";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
//firebase
import { auth } from "@/firebase/auth/appConfig";
//errors
import { useErrors } from "@/hooks/useErrors";
//other dependencies
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//components
import Spinner from "@/components/design/Spinner";

// Yup config
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string(),
});

export default function EmailSignInUI() {
  const { errors, addError } = useErrors();

  const [signInWithEmailAndPassword, signInUser, loading, error] =
    useSignInWithEmailAndPassword(auth);

  //handle email sign in
  const handleEmailSignIn = async (values: {
    email: string;
    password: string;
  }) => {
    const { email, password } = values;
    try {
      await signInWithEmailAndPassword(email, password);
    } catch (signInError) {
      // Check if signInError is an object with a message property of type string
      if (
        typeof signInError === "object" &&
        signInError !== null &&
        "message" in signInError &&
        typeof signInError.message === "string"
      ) {
        addError(signInError.message);
      } else {
        // If signInError does not match the expected structure, set a default error message
        addError("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    if (error) {
      addError(error.message);
    }
  }, [error, addError]);

  let content;

  if (signInUser) {
    content = null;
  } else {
    content = (
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            await handleEmailSignIn(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <Field
                    type="email"
                    name="email"
                    required
                    className="block w-full rounded-md border-0 px-4 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    className="text-sm text-red-400"
                    name="email"
                    component="div"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <Field
                    type="password"
                    name="password"
                    required
                    className="block w-full rounded-md border-0 px-4 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="password" component="div" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                {/* <div className="flex items-center">
                            <input
                              id="remember-me"
                              name="remember-me"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="remember-me"
                              className="ml-3 block text-sm leading-6 text-gray-700"
                            >
                              Remember me
                            </label>
                          </div> */}

                <div className="text-sm leading-6">
                  <Link
                    href="/signin/resetpassword"
                    className="font-semibold text-green-700 hover:text-green-600"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || loading || errors.length > 0}
                  className="flex w-full justify-center rounded-md bg-emerald-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:cursor-pointer hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:opacity-50"
                >
                  {!(isSubmitting || loading) ? "Sign in" : <Spinner />}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
  return content;
}
