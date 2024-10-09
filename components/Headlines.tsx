"use client";
import { Newspaper } from "lucide-react";
import React, { useEffect, useState } from "react";
// import Image from "next/image"; // Import Next.js Image component

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface ApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export default function Headlines() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null); // Error handling state

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=761c4e9f67a04501b5d7f05313f4c94c"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch headlines");
        }
        return res.json();
      })
      .then((data: ApiResponse) => {
        setArticles(data.articles.slice(0, 5)); // Limit to 5 articles
      })
      .catch((err) => {
        setError(err.message); // Set error message if API request fails
      });
  }, []);

  return (
    <section>
      <nav className="flex justify-between items-center p-4 border-b border-gray-300">
        <h1 className="text-3xl font-bold flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          <Newspaper fill="blue" className="text-pink-200" size={24} /> News
          Headlines.io
        </h1>
        <ul className="flex gap-4">
          <li>
            <a href="#" className="text-lg hover:text-blue-500">
              Home
            </a>
          </li>
        </ul>
      </nav>

      <section className="p-4 flex flex-col items-center justify-center h-screen max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold my-4">Welcome to News</h1>
        <p className="text-xl text-center">
          Get the latest news from all around the world. From business to
          technology, health, science, sports, and entertainment, we have got
          you covered. Stay up to date with the current events, trends, and
          analysis to make informed decisions. Whether you&apos;re a news junkie
          or just want to stay informed about the world around you, we&apos;ve
          got you covered.
        </p>
        <p className="text-xl text-center font-semibold ">
          Scroll down to view more
        </p>
      </section>
      <section className="mx-auto max-w-2xl p-4 flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Latest Headlines</h2>

        {error ? (
          <p className="error-message">Error fetching headlines: {error}</p> // Display error message
        ) : (
          <div className="flex flex-col gap-4 mt-4">
            {articles.length > 0 ? (
              articles.map((item, index) => (
                <div key={index} className="flex flex-col ">
                  <h1 className="text-3xl font-bold">{item.title}</h1>
                  <p className="text-lg flex items-center justify-end mt-6">
                    Source: {item.source.name}
                  </p>
                  <p className="text-lg flex items-center justify-end mb-6">
                    Published on:{" "}
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </p>
                  {item.urlToImage && (
                    <img
                      src={item.urlToImage}
                      alt={item.title}
                      width={800}
                      height={250}
                      className="object-cover rounded-xl border border-gray-300 hover:scale-105 transition-all "
                    />
                  )}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg flex items-center justify-end mt-6 text-blue-500 underline leading-2"
                  >
                    Read more
                  </a>
                </div>
              ))
            ) : (
              <p>Loading headlines...</p> // Loading message while waiting for the response
            )}
          </div>
        )}
      </section>
    </section>
  );
}
