"use client";
//next
import Link from "next/link";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

//firebase
import { auth } from "@/firebase/auth/appConfig";
//other dependencies
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//components
import ErrorAlert from "@/components/ui/ErrorAlert";
import Spinner from "@/components/design/Spinner";
import { PrimaryLinkButton } from "@/app/_components/ui/_components/Buttons";

//jotai
import { useAtom } from "jotai";
import { anyErrorAtom } from "@/state/store";

// Yup config
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string(),
});

export default function EmailSignInUI() {
  const [signInWithEmailAndPassword, signInUser, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [, setAnyError] = useAtom(anyErrorAtom);

  //handle email sign in
  const handleEmailSignIn = async (values: {
    email: string;
    password: string;
  }) => {
    const { email, password } = values;
    await signInWithEmailAndPassword(email, password);
  };

  if (error) {
    setAnyError(error);
  }

  let content;

  if (signInUser) {
    content = null;
  } else {
    content = (
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            setAnyError({ message: "" });
            handleEmailSignIn(values);
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
                  disabled={isSubmitting || loading}
                  className="flex w-full justify-center rounded-md bg-emerald-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  {!(isSubmitting || loading) ? "Sign in" : <Spinner />}
                </button>
              </div>
              <ErrorAlert />
            </Form>
          )}
        </Formik>
      </div>
    );
  }
  return content;
}
