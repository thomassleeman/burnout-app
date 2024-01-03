"use client";
//react
import { useState } from "react";
//next
import { useRouter } from "next/navigation";
//firebase
import { storage, db } from "@firebase/auth/appConfig";
//firebase storage
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
//firestore
import { doc, getFirestore, setDoc, serverTimestamp } from "firebase/firestore";
//components
import ErrorAlert from "@/components/ui/ErrorAlert";
import Spinner from "@/components/design/Spinner";

export default function NewArticleForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);

  const fields = [
    { label: "author", type: "input" },
    { label: "title", type: "input" },
    { label: "slug", type: "input" },
    { label: "category", type: "input" },
    { label: "content", type: "textarea" },
    { label: "summary", type: "textarea" },
  ];

  const [fieldValues, setFieldValues] = useState({
    author: "",
    title: "",
    slug: "",
    category: "",
    content: "",
    summary: "",
    headerImage: "",
    date: serverTimestamp(),
  });

  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setImage(e.currentTarget.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* ----Image -----------*/
    if (!image) {
      alert("Please upload an image first!");
      return;
    }

    const storageRef = ref(storage, `/images/${fieldValues.slug}/head`);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percentCompleted = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percentCompleted);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            setFieldValues({
              ...fieldValues,
              headerImage: url,
            });

            // Use the updated URL directly in the setDoc call
            const updatedFieldValues = {
              ...fieldValues,
              headerImage: url,
            };

            const docRef = doc(db, "articles", updatedFieldValues.slug);
            setDoc(docRef, updatedFieldValues);
          })
          .then(() => {
            router.push(`/articles/${fieldValues.slug}`);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      }
    );
    /* ---------------------- */

    /* ----Firestore -----------*/
    // Add a new document with a generated id.
    // const docRef = doc(db, "articles", fieldValues.slug);
    // await setDoc(docRef, fieldValues);
    /* ---------------------- */
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div>
        <div>
          {fields.map((field) => {
            return (
              <div key={field.label} className="my-3 flex gap-x-5">
                {/* <label>{field.label}</label> */}
                {/* <input
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-slate-500 sm:text-sm"
                  type={field.type}
                  name={field.label}
                  placeholder={field.label}
                  rows={field.type === "textarea" ? 10 : 1}
                  cols={field.type === "textarea" ? 40 : 1}
                  onChange={(e) => {
                    setFieldValues({
                      ...fieldValues,
                      [field.label]: e.target.value,
                    });
                  }}
                /> */}
                {field.type === "textarea" ? (
                  <textarea
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-slate-500 dark:border-blue-400/50 dark:bg-slate-700 sm:text-sm"
                    name={field.label}
                    placeholder={field.label}
                    rows={field.label === "content" ? 15 : 5}
                    // cols={field.label === "content" ? 100 : 10}
                    onChange={(e) => {
                      setFieldValues({
                        ...fieldValues,
                        [field.label]: e.target.value,
                      });
                    }}
                  />
                ) : (
                  <input
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-slate-500 dark:border-blue-400/50 dark:bg-slate-700 sm:text-sm"
                    type={field.type}
                    name={field.label}
                    placeholder={field.label}
                    onChange={(e) => {
                      setFieldValues({
                        ...fieldValues,
                        [field.label]: e.target.value,
                      });
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
        >
          Upload an Image
        </label>
        <div className="mt-2 flex items-center space-x-5">
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-slate-500 dark:border-blue-400/50 dark:bg-slate-700 sm:text-sm"
          />
          <h2 className="text-red-700">
            {percent > 0 ? `${percent}% uploaded.` : null}
          </h2>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="flex w-full justify-center rounded-md bg-green-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-900"
      >
        {!loading ? "Submit" : <Spinner />}
      </button>
    </form>
  );
}
