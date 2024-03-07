import ErrorAlert from "@/components/ui/ErrorAlert";
import Form from "./_components/newArticleForm/Form";

export default async function uploadArticle() {
  return (
    <>
      <main className="min-h-screen">
        <ErrorAlert />
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6  lg:flex-none lg:px-20 xl:px-24">
          <h2 className="mb-8 self-center text-3xl font-bold leading-9 tracking-tight text-slate-600 dark:text-slate-200 md:mb-8 md:text-4xl lg:mb-16">
            Upload an Article
          </h2>
          <Form />
        </div>
      </main>
    </>
  );
}
