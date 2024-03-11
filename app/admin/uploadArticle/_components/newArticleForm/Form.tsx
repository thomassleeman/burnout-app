/* This is a client component that imports a server action to handle the openai api call for text-to-voice processing*/

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
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { FieldValue } from "firebase/firestore";
//jotai
import { useAtom } from "jotai";
import { anyErrorAtom } from "@/state/store";
//components
import { generateAudioFromText } from "@actions/openaiActions";
//icons
import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid";

export default function Form() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  const [, setAnyError] = useAtom(anyErrorAtom);

  const fields = [
    { label: "author", type: "input" },
    { label: "title", type: "input" },
    { label: "slug", type: "input" },
    { label: "category", type: "input" },
    { label: "content", type: "textarea" },
    { label: "summary", type: "textarea" },
  ];

  const [fieldValues, setFieldValues] = useState<{
    author: string;
    title: string;
    slug: string;
    category: string;
    content: string;
    summary: string;
    images: { name: string; image: string }[];
    date: FieldValue;
  }>({
    author: "",
    title: "",
    slug: "",
    category: "",
    content: "",
    summary: "",
    images: [],
    date: serverTimestamp(),
  });

  /* Header image pre-submit */

  const [headerImage, setHeaderImage] = useState<File | null>(null);

  const handleHeaderImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.id === "headerImage") {
      setHeaderImage(e.currentTarget.files[0]);
    }
  };

  /* Additional images pre-submit */

  const [images, setImages] = useState<{ name: string; image: File | null }[]>(
    []
  );

  console.log("images: ", images);

  const addImage = () => {
    setImages([...images, { name: "", image: null }]);
  };

  const handleImageNameChange = (index: number, value: string) => {
    const updatedImages = [...images];
    updatedImages[index].name = value;
    setImages(updatedImages);
  };

  const handleImageFileChange = (index: number, file: File) => {
    const updatedImages = [...images];
    updatedImages[index].image = file;
    setImages(updatedImages);
  };

  /* HANDLE SUBMIT */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    /* Content checks */
    if (!headerImage) {
      alert("All articles must have a header image.");
      setLoading(false);
      return;
    }

    if (!fieldValues.content) {
      alert("Please enter some content!");
      setLoading(false);
      return;
    }

    if (!fieldValues.slug) {
      alert("Please enter a slug!");
      setLoading(false);
      return;
    }

    const validateAddlImages = (
      images: { name: string; image: File | null }[]
    ) => {
      return images.every((image) => image.name !== "" && image.image !== null);
    };

    if (!validateAddlImages(images)) {
      alert(
        "Please make sure all additional inline images have a name and a file."
      );
      return;
    }

    const validateImageNames = (
      images: { name: string; image: File | null }[]
    ) => {
      return !images.some((image) => image.name === "head");
    };

    if (!validateImageNames(images)) {
      alert(
        "The name 'head' is reserved and cannot be used for additional images."
      );
      return;
    }

    /* Add header image to images - Use a variable as useState is async and therefore too slow.*/

    const allImages = [...images, { name: "head", image: headerImage }];

    /* ------------------------------------------------------------------------ */

    /* IMAGE */
    const uploadImages = async (allImages: { name: string; image: File }[]) => {
      const imageUploadPromises = allImages.map(async (imageObj) => {
        const imageStorageRef = ref(
          storage,
          `/images/${fieldValues.slug}/${imageObj.name}`
        );

        const imageUploadTask = uploadBytesResumable(
          imageStorageRef,
          imageObj.image
        );

        imageUploadTask.on(
          "state_changed",
          (snapshot) => {
            const percentCompleted = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setPercent(percentCompleted);
          },
          (err) => setAnyError(err)
        );

        await imageUploadTask;

        const imageUrl = await getDownloadURL(imageUploadTask.snapshot.ref);

        return { name: imageObj.name, image: imageUrl };
      });

      const imageUrls = await Promise.all(imageUploadPromises);

      return imageUrls;
    };

    // Use the function
    const validImages = allImages.filter((image) => image.image !== null);
    const imageUrls = await uploadImages(
      validImages as { name: string; image: File }[]
    );

    /* ------------------------------------------------------------------------ */

    /* CONTENT */

    /* Replace placeholders with corresponding images */

    function replacePlaceholdersWithImages(
      content: string,
      images: { name: string; image: string }[]
    ) {
      // Create a map for easy lookup of image URLs by name
      const imageMap = images.reduce((map, image) => {
        map[image.name] = image.image;
        return map;
      }, {} as { [key: string]: string });

      // This regular expression matches placeholders in the format <<name-of-image>>
      const regex = /<<([^>]+)>>/g;

      // Replace each placeholder with an image tag
      const newContent = content.replace(regex, (match, imageName) => {
        const imageUrl = imageMap[imageName];
        if (imageUrl) {
          // Remove hyphens from the image name for the alt tag
          const altText = imageName.replace(/-/g, " ");
          return `<img src="${imageUrl}" alt="${altText}" />`;
        } else {
          // If there's no image with the given name, leave the placeholder as is
          return match;
        }
      });

      return newContent;
    }

    const newContent = replacePlaceholdersWithImages(
      fieldValues.content,
      imageUrls
    );

    const contentStorageRef = ref(storage, `/content/${fieldValues.slug}`);

    const contentUploadTask = uploadBytesResumable(
      contentStorageRef,
      new Blob([newContent], { type: "text/plain" })
    );

    contentUploadTask.on(
      "state_changed",
      (snapshot) => {
        const percentCompleted = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percentCompleted);
      },
      (err) => setAnyError(err)
    );

    await contentUploadTask;

    const contentUrl = await getDownloadURL(contentUploadTask.snapshot.ref);
    /* ------------------------------------------------------------------------ */

    /* AUDIO */

    function replacePlaceholders(content: string) {
      // This regular expression matches placeholders in the format <<name-of-image>>
      const regex = /<<([^>]+)>>/g;

      // Replace each placeholder with the specified text
      const newContent = content.replace(regex, (match, imageName) => {
        // Remove hyphens from the image name
        const imageNameWithoutHyphens = imageName.replace(/-/g, " ");
        return `The article shows an image entitled ${imageNameWithoutHyphens}`;
      });

      return newContent;
    }

    const contentWithoutPlaceholders = replacePlaceholders(fieldValues.content);

    /* A uint8Array cannot be sent from the server component to the client component. Hence it is necessary to convert to a base64String, send that and then convert back to uint8Array on the client side.  */
    const base64String = await generateAudioFromText(
      contentWithoutPlaceholders
    );
    if (!base64String) {
      alert("There was an error generating the audio. Please try again later.");
      setLoading(false);
      return;
    }

    let audioBlob = Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0));
    if (!audioBlob) {
      alert("There was an error generating the audio. Please try again later.");
      setLoading(false);
      return;
    }

    const audioStorageRef = ref(storage, `/audio/${fieldValues.slug}`);

    const audioMetadata = {
      contentType: "audio/mpeg",
    };

    const audioUploadTask = uploadBytesResumable(
      audioStorageRef,
      audioBlob,
      audioMetadata
    );

    if (!audioUploadTask) {
      alert("There was an error generating the audio. Please try again later.");
      setLoading(false);
      return;
    }

    audioUploadTask.on(
      "state_changed",
      (snapshot) => {
        const percentCompleted = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percentCompleted);
      },
      (err) => setAnyError(err)
    );

    await audioUploadTask;

    const audioUrl = await getDownloadURL(audioUploadTask.snapshot.ref);
    /* ------------------------------------------------------------------------ */

    const finalFieldValues = {
      ...fieldValues,
      content: contentUrl,
      images: imageUrls,
      audio: audioUrl,
    };

    console.log("imageUrls: ", imageUrls);
    console.log("finalFieldValues: ", finalFieldValues);

    setFieldValues(finalFieldValues);

    try {
      const finalDocRef = doc(db, "articles", fieldValues.slug);
      await setDoc(finalDocRef, finalFieldValues);
    } catch (error) {
      console.error("Error writing document: ", error);
    }
    setLoading(false);

    router.push(`/articles/${fieldValues.slug}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        {fields.map((field) => {
          return (
            <div key={field.label} className="my-3 gap-x-5">
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
                  className="block w-full max-w-sm rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-slate-500 dark:border-blue-400/50 dark:bg-slate-700 sm:text-sm"
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
      <div className="flex flex-col space-y-6">
        {/* Mandatory header image */}
        <div>
          <label
            htmlFor="headerImage"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
          >
            Header image
          </label>
          <div className="mt-2 flex items-center space-x-24">
            <input
              id="headerImage"
              name="headerImage"
              type="file"
              accept="image/*"
              onChange={handleHeaderImageChange}
              className="block w-full max-w-sm cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-slate-500 dark:border-blue-400/50 dark:bg-slate-700 sm:text-sm"
            />
          </div>
        </div>
        {/* ------------------------------ */}
        <div>
          <h2 className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
            Inline Images
          </h2>
          {images.map((image, index) => (
            <div
              key={index}
              className="my-2 flex flex-wrap gap-3 border-y py-3 md:gap-x-8"
            >
              <input
                type="text"
                placeholder="image name"
                value={image.name}
                onChange={(e) => handleImageNameChange(index, e.target.value)}
                className="block w-full max-w-sm cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-slate-500 dark:border-blue-400/50 dark:bg-slate-700 sm:text-sm"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files &&
                  handleImageFileChange(index, e.target.files[0])
                }
                className="block w-full max-w-sm cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-slate-500 dark:border-blue-400/50 dark:bg-slate-700 sm:text-sm"
              />
              <MinusIcon
                className="h-10 w-10 cursor-pointer"
                onClick={() => {
                  const updatedImages = images.filter(
                    (image, i) => i !== index
                  );
                  setImages(updatedImages);
                }}
              />
            </div>
          ))}
          <button type="button" onClick={addImage}>
            <PlusIcon className="h-10 w-10" />
          </button>
        </div>
      </div>
      <div className="flex items-center">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-emerald-800 px-3 py-1.5 text-center font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-900 md:my-8 md:w-56"
        >
          {!loading ? "Submit" : "...Loading"}
        </button>
        <h2 className="text-red-700">
          {percent > 0 ? `Uploading new image. ${percent}% complete.` : null}
        </h2>
      </div>
    </form>
  );
}
