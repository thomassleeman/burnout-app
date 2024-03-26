"use client";
//react
import { useEffect, useState, useCallback } from "react";

//firebase
import { auth } from "@/firebase/auth/appConfig";
import { onAuthStateChanged } from "firebase/auth";

//firestore
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/auth/appConfig";

//jotai
import { useAtom } from "jotai";
import { showSearchResultsAtom } from "@/state/store";

//components
import SearchResults from "@/app/_components/ui/nav/SearchResults";

//icons
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

interface NavSearchProps {
  className?: string;
}

export default function NavSearch({ className }: NavSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState<Article[]>([
    // { title: "no search", id: "0", content: "", slug: "" },
  ]);

  const [showSearchResults, setShowSearchResults] = useAtom(
    showSearchResultsAtom
  );

  const getArticles = useCallback(async () => {
    const articlesRef = collection(db, "articles");
    const articlesSnapshot = await getDocs(articlesRef);
    const articlesList = articlesSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        date: data.date.toDate(),
        slug: data.slug,
        content: data.content,
        headerImage: data.headerImage,
        headerImageAlt: data.headerImageAlt,
        category: data.category,
        summary: data.summary,
        author: data.author,
      };
    });
    return articlesList;
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return;
      getArticles();
    });
  }, [getArticles]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return;
    });
  }, []);

  const navSearch = async (searchTerm: string) => {
    const articles = await getArticles();
    const results = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (results.length === 0) {
      setSearchResults([
        { title: "no results found", id: "0", content: "", slug: "" },
      ]);
    } else {
      setSearchResults(results);
    }
  };

  useEffect(() => {
    setShowSearchResults(searchResults.length > 0);
  }, [searchResults, setShowSearchResults]);

  return (
    <div
      className={`${className} flex flex-1 items-center justify-center md:mr-6`}
    >
      <div className="w-full max-w-lg lg:max-w-xs">
        <label htmlFor="search" className="sr-only">
          Search Articles
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            id="search"
            name="search"
            className="block w-full rounded-md border-0 py-1.5 pl-10 pr-1 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:leading-6"
            placeholder="Search Articles"
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchTerm !== "") {
                navSearch(searchTerm);
              }
            }}
          />
        </div>
      </div>
      {showSearchResults ? <SearchResults articles={searchResults} /> : null}
    </div>
  );
}
