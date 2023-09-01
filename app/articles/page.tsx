import { getSortedArticlesData } from "./getArticlesData";
import ArticleCard from "./_components/ArticleCard";

export default async function Page() {
  const articles = await getSortedArticlesData("date", "desc");

  return (
    <main className="px-4 sm:px-1">
      <h1 className="mb-2 text-4xl font-bold text-slate-600 dark:text-white lg:text-5xl">
        Library
      </h1>
      <section className="mb-20 mt-6">
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 md:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </main>
  );
}
