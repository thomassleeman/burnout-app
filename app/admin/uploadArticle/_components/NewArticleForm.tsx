"use client";
//next
import Link from "next/link";
// dependencies
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//components
import ErrorAlert from "@/components/ui/ErrorAlert";
import Spinner from "@/components/design/Spinner";

// Yup config
const articleSchema = Yup.object().shape({
  author: Yup.string().required("Author is required"),
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  content: Yup.string().required("Content is required"),
  summary: Yup.string().required("Summary is required"),
});

export default function NewArticleForm() {
  const fields = [
    { label: "author", type: "input" },
    { label: "title", type: "input" },
    { label: "category", type: "input" },
    { label: "content", type: "textarea" },
    { label: "summary", type: "textarea" },
  ];

  //handle email sign in
  // const handleSubmit = (values) => {};
  return (
    <div>
      <Formik
        initialValues={{
          author: "",
          title: "",
          category: "",
          content: "",
          summary: "",
        }}
        validationSchema={articleSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          // handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {fields.map((field) => (
              <div key={field.label}>
                <label
                  htmlFor={field.label}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {`${field.label.charAt(0).toUpperCase()}${field.label.slice(
                    1
                  )}`}
                </label>
                <div className="mt-2">
                  <Field
                    as={field.type}
                    name={field.label}
                    required
                    className="block w-full rounded-md border-0 px-4 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    className="text-sm text-red-400"
                    name={field.label}
                    component="div"
                  />
                </div>
              </div>
            ))}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {!isSubmitting ? "Submit" : <Spinner />}
              </button>
            </div>
            <ErrorAlert />
          </Form>
        )}
      </Formik>
    </div>
  );
}
