TODO:

~ Add a user profile page.
~ Add a user settings page.
: ~ Add a password reset feature.
: ~ Add a delete user feature.
~ Add a database
~ Add oAuth login

/signin/resetpassword
/signup (email verification)
~ The email link revels NEXT_PUBLIC_FIREBASE_API_KEY - Is that normal?
~ Link refers to "burnout project" and "project-941881196808"

signin page...

'use client';
//react
import { useState, useEffect } from 'react';
//next
import Link from 'next/link';
import { useRouter } from 'next/navigation';
//firebase
import { auth } from '@/firebase/auth/appConfig';
import { getIdToken, User } from 'firebase/auth';
//react-firebase-hooks
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
//jotai
import { useHydrateAtoms } from 'jotai/utils';
import { useAtom } from 'jotai';
import { userIsAdminAtom } from '@/atoms/isAdminAtom';
//other dependencies
import { Formik, Form, Field, ErrorMessage } from 'formik';
import \* as Yup from 'yup';
//custom hooks
// import useAuth from '@/firebase/auth/useAuth';
//functions
import authStatus from '@/firebase/auth/authStatus';
//Components
import GoogleButton from '@/app/\_components/design/GoogleButton';
import ErrorAlert from '@/components/ui/ErrorAlert';
import Spinner from '@/components/design/Spinner';

// Yup config
const loginSchema = Yup.object().shape({
email: Yup.string().email('Invalid email').required('Required'),
password: Yup.string(),
});

export default function SignIn() {
const router = useRouter();
const [tokenError, setTokenError] = useState({});

const [user, authStateLoading, authStateError] = useAuthState(auth, {
onUserChanged: async (user) => {
if (user && !user?.emailVerified) {
setTokenError({
message:
'Please verify your email address before signing in. To receive another verification email select "forgot password" above.',
});
return;
}
const token = await getIdToken(user);
console.log('**\*\***user: ', user);
try {
await fetch('/api/signin', {
method: 'POST',
headers: {
Authorization: `Bearer ${token}`,
},
}).then((response) => {
if (response.status === 200) {
console.log('response: ', response);

            router.push('/dashboard');
          }
        });
      } catch (err) {
        console.log('set token error from signin page: ', err);
      }
    },

});

if (user) {
console.log('/signin: user signed in, redirected: ', user);
router.push('/dashboard');
}

/_ GOOGLE SIGN IN _/
const handleGoogleSignIn = async () => {
//TODO: add google login
};

/_ EMAIL SIGN IN _/
const [signInWithEmailAndPassword, signInUser, loading, error] =
useSignInWithEmailAndPassword(auth);

const handleEmailSignIn = async (values: {
email: string;
password: string;
}) => {
const { email, password } = values;
await signInWithEmailAndPassword(email, password);
console.log('signInUser: ', signInUser);
};

const anyError = error || authStateError || tokenError;

console.log('anyError: ', anyError);
return (
<>
<main className="min-h-screen">
<div className="flex min-h-full flex-1">
<div className="flex flex-1 flex-col justify-center px-4 py-1 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
<div className="mx-auto w-full max-w-sm lg:w-96">
<div>
<h2 className="mt-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">
Sign in
</h2>
</div>

              <div className="mt-10">
                <div>
                  <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      setSubmitting(true);
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
                          <div className="flex items-center">
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
                          </div>

                          <div className="text-sm leading-6">
                            <Link
                              href="/signin/resetpassword"
                              className="font-semibold text-indigo-600 hover:text-indigo-500"
                            >
                              Forgot password?
                            </Link>
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            disabled={
                              isSubmitting || loading || authStateLoading
                            }
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            {!(isSubmitting || loading || authStateLoading) ? (
                              'Sign in'
                            ) : (
                              <Spinner />
                            )}
                          </button>
                        </div>
                        <ErrorAlert error={anyError?.message} />
                      </Form>
                    )}
                  </Formik>
                </div>

                <div className="mt-10">
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
                    {/* TODO: add google login */}
                    {/* <form action={handleGoogleLogin}> */}
                    <button type="submit">
                      <GoogleButton />
                    </button>
                    {/* </form> */}
                    {/* <a
                      href="#"
                      className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
                    >
                      <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-semibold leading-6">
                        Google
                      </span>
                    </a> */}
                  </div>
                </div>
              </div>
              <div className="mt-12 w-full text-center">
                <p className="text-sm text-gray-400 ">
                  Don&apos;t have an account yet?{' '}
                  <Link className="text-blue-400" href="/signup">
                    Sign up
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
