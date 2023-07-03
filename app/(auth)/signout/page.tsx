'use client';
//react
import { useState } from 'react';
//next
import { useRouter } from 'next/navigation';
//firebase
import { auth } from '@/firebase/auth/appConfig';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

//functions
import authStatus from '@/firebase/auth/authStatus';
//components
import ErrorAlert from '@/components/ui/ErrorAlert';
import Spinner from '@/components/design/Spinner';

export default function SignOut() {
  const [apiSignoutErr, setApiSignoutErr] = useState({});
  const router = useRouter();

  // useEffect(() => {
  //   const unsubscribe = authStatus((user) => {
  //     if (!user) {
  //       router.push('/signin');
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [router]);
  const [user] = useAuthState(auth);
  console.log('user: ', user);
  const [signOut, loading, fbError] = useSignOut(auth);

  const handleSignOut = async () => {
    const userSignedOut = await signOut();

    const response = await fetch('/api/signout', {
      method: 'POST',
    });

    if (response.status === 200 && userSignedOut) {
      router.push('/signin');
    } else {
      setApiSignoutErr({ message: 'Something went wrong. Please try again.' });
    }
  };
  const anyError = fbError || apiSignoutErr;
  return (
    <>
      {/* I have removed min-h-screen from this main tag. */}
      <main>
        <ErrorAlert error={anyError?.message} />
        {/* I have removed min-h-full from this div */}
        <div className="flex flex-1">
          <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div className="mt-10">
                <div>
                  <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="leading-6text-sm pb-7 text-base text-gray-500">
                        {user ? `Signed in as ${user.email}` : null}
                      </h3>

                      <button
                        onClick={handleSignOut}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {!loading && user ? 'Sign Out' : <Spinner />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative hidden w-0 flex-1 md:block">
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
