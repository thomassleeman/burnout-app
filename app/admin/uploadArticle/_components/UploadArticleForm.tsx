"use client";

import dynamic from "next/dynamic";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useWindowSize from "@/hooks/useWindowSize";
import Spinner from "@/components/design/Spinner";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <Spinner />,
});
import "react-quill/dist/quill.snow.css"; // for Snow theme
import "../styles.css";

const modules = {
  history: {
    delay: 2000,
    maxStack: 500,
    userOnly: true,
  },
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ script: "sub" }, { script: "super" }],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],

    ["clean"],
  ],

  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

interface FormValues {
  title: string;
  content: string;
  isDraft: boolean;
  isPublished: boolean;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
});

export default function ArticleForm() {
  const { width } = useWindowSize();

  const handleSubmit = async (values: FormValues) => {
    console.log("values", values);
    // const { title, content, isDraft, isPublished } = values;
    // const articleRef = db.collection('articles').doc();
    // const article = {
    //   title,
    //   content,
    //   isDraft,
    //   isPublished,
    //   createdAt: Timestamp.now(),
    //   updatedAt: Timestamp.now(),
    // };
    // await articleRef.set(article);
  };

  return (
    <Formik<FormValues>
      initialValues={{
        title: "",
        content: "",
        isDraft: true,
        isPublished: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="mx-0 min-w-full text-lg text-gray-800 md:mx-1 md:min-w-fit">
          <div className="my-6 flex flex-col">
            {/* <label htmlFor="title" className="ml-1 mr-6 text-2xl">
              Title
            </label> */}
            <Field
              type="text"
              id="title"
              name="title"
              placeholder="Enter a title..."
              className="mx-1 flex-1 px-3 py-1.5 text-2xl leading-6 text-gray-800 shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 md:mx-0"
              required
            />
            <ErrorMessage name="title" component="p" className="mt-2" />
          </div>
          <div className="quill-container">
            <QuillNoSSRWrapper
              modules={modules}
              onChange={(content) => setFieldValue("content", content)}
              theme={`${width > 768 ? "snow" : "bubble"}`}
              placeholder="Compose something beautiful..."
              className="mx-1 min-h-full rounded-lg border-none border-gray-300 text-lg shadow-md md:mx-0 md:border"
            />
          </div>
          <ErrorMessage name="content" component="p" className="text-red-600" />
          <button
            type="submit"
            disabled={isSubmitting}
            className="my-6 ml-1 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {!isSubmitting ? "Submit" : <Spinner />}
          </button>
        </Form>
      )}
    </Formik>
  );
}

// export default function UploadArticle() {
//   return (
//     <div className="my-10 flex flex-col items-center justify-center py-2">
//       <h1 className="mb-5 bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-3xl text-transparent md:mb-10 md:text-5xl">
//         Upload Article
//       </h1>
//       <div className="flex w-full flex-col items-center justify-center">
//         <ArticleForm />
//       </div>
//     </div>
//   );
// }
