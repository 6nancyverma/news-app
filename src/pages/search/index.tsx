import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {
  fetchSearchResults,
  clearSearchResults,
  selectSearchArticles,
} from "../../slices/searchSlice";
import NewsCard from "../../components/NewsCard";
import Loading from "../../components/Loading";
import CustomError from "../../components/Error";

const Search: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const dispatch = useDispatch<AppDispatch>();
  const articles = useSelector(selectSearchArticles);
  const loading = useSelector((state: RootState) => state.search.loading);
  const error = useSelector((state: RootState) => state.search.error);
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;
  const placeholderImage = "/no-image.svg";

  useEffect(() => {
    if (query) {
      dispatch(fetchSearchResults(query));
    } else {
      dispatch(clearSearchResults());
    }
  }, [query, dispatch]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <CustomError error={error} />;
  }

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const displayedArticles = articles.slice(startIndex, endIndex);

  return (
    <div className="news-container">
      <div className="content-container py-4">
        <h2>Search Results for "{query}"</h2>
        <div className="row bg-white p-4 mt-4">
          {displayedArticles.map((article, index) => (
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
              {Array.from(
                { length: Math.ceil(articles.length / pageSize) },
                (_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      page === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  page === Math.ceil(articles.length / pageSize)
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === Math.ceil(articles.length / pageSize)}
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

export default Search;
