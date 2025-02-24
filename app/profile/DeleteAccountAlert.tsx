import { useEffect } from "react";
//next.js
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
//firebase
import { auth } from "@/firebase/auth/appConfig";
//firestore
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/auth/appConfig";
// React firebase hooks
import { useDeleteUser } from "react-firebase-hooks/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { useErrors } from "@/hooks/useErrors";

//icons
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function DeleteAccountAlert({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { errors, addError } = useErrors();
  const [user] = useAuthState(auth);
  const [deleteUser, deleteUserloading, deleteUserError] = useDeleteUser(auth);

  const router = useRouter();

  const handleDeleteAccount = async () => {
    try {
      //delete user from firestore
      if (user && user.uid) {
        const userDocRef = doc(db, "users", user.uid);
        await deleteDoc(userDocRef);

        // Deleting user from auth
        await deleteUser();
        router.push("/");
        setOpen(false);
      } else {
        // Handle the case where user or user.uid is undefined
        addError("User information is missing.");
      }
    } catch (error) {
      // Check if signInError is an object with a message property of type string
      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        addError(error.message);
      } else {
        // If signInError does not match the expected structure, set a default error message
        addError("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    if (deleteUserError) {
      addError(deleteUserError.message);
    }
  }, [deleteUserError, addError]);

  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={setOpen}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Delete account
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete your account? All of
                        your data will be permanently removed. This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    disabled={deleteUserloading || errors.length > 0 || !user}
                    onClick={handleDeleteAccount}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:opacity-50 sm:ml-3 sm:w-auto"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    data-autofocus
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
