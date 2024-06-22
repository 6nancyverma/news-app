import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { fetchArticles } from "../../slices/articlesSlice";
import { fetchArticlesByCountry } from "../../slices/countryArticlesSlice";
import NewsCard from "../NewsCard";
import Loading from "../Loading";
import { Article } from "../../types/types";
import CustomError from "../Error";

interface NewsProps {
  country: string;
  topic?: string;
  icon: React.ReactNode;
}

const News: React.FC<NewsProps> = ({ country, topic, icon }) => {
  const dispatch = useDispatch<AppDispatch>();
  const articlesState = useSelector((state: RootState) =>
    topic ? state.articles : state.countryArticles
  );
  const [page, setPage] = useState<number>(1);
  const placeholderImage = "/no-image.svg";

  useEffect(() => {
    if (topic) {
      dispatch(fetchArticles({ country, topic, page }));
    } else {
      dispatch(fetchArticlesByCountry({ country, page }));
    }
  }, [country, topic, page, dispatch]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= articlesState.totalPages) {
      setPage(newPage);
    }
  };

  if (articlesState.loading) {
    return <Loading />;
  }

  if (articlesState.error) {
    return <CustomError error={articlesState.error} />;
  }

  return (
    <div className="news-container">
      <div className="content-container py-5">
        <h2>
          {icon}{" "}
          {topic ? `${topic.charAt(0).toUpperCase() + topic.slice(1)} ` : ""}
          News
        </h2>
        <div className="row bg-white p-4 mt-5">
          {articlesState.articles.map((article: Article, index: number) => (
            <NewsCard
              key={index}
              article={article}
              placeholderImage={placeholderImage}
            />
          ))}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: articlesState.totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${page === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  page === articlesState.totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === articlesState.totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default News;
