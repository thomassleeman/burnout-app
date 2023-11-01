import ErrorAlert from "@/components/ui/ErrorAlert";
import NewArticleForm from "./_components/NewArticleForm";

export default async function uploadArticle() {
  return (
    <>
      <main className="min-h-screen">
        <ErrorAlert />
        <div className="flex flex-1 flex-col justify-center px-4 sm:px-6 md:py-12  lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="text-4xl font-bold leading-9 tracking-tight text-slate-600 md:mb-8">
                Upload an Article
              </h2>
            </div>
            <NewArticleForm />
          </div>
        </div>
      </main>
    </>
  );
}
