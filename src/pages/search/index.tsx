import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NewsCard from "../../components/NewsCard";
import Loading from "../../components/Loading";
import { Article } from "../../types/types";
import CustomError from "../../components/Error";

const apiKey = import.meta.env.VITE_API_NEWS_API_KEY;

const Search: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const placeholderImage = "/no-image.svg";

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
        );
        setArticles(response.data.articles);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
      setLoading(false);
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <CustomError error={error} />;
  }

  return (
    <div className="news-container">
      <div className="content-container py-4">
        <h2>Search Results for "{query}"</h2>
        <div className="row bg-white p-4 mt-4">
          {articles.map((article, index) => (
            <NewsCard
              key={index}
              article={article}
              placeholderImage={placeholderImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
