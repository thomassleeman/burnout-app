import UploadArticleForm from './_components/UploadArticleForm';

export default function UploadArticlePage() {
  return (
    <div className="my-10 flex flex-col items-center justify-center py-2">
      <h1 className="mb-5 bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-3xl text-transparent md:mb-10 md:text-5xl">
        Upload Article
      </h1>
      <div className="flex w-full flex-col items-center justify-center">
        <UploadArticleForm />
      </div>
    </div>
  );
}
