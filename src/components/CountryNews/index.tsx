import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { fetchArticlesByCountry } from "../../slices/countryArticlesSlice";
import NewsCard from "../NewsCard";
import Loading from "../Loading";
import { Article } from "../../types/types";
import CustomError from "../Error";

interface CountryNewsProps {
  icon: React.ReactNode;
}

const CountryNews: React.FC<CountryNewsProps> = ({ icon }) => {
  const { country } = useParams<{ country: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error, totalPages } = useSelector(
    (state: RootState) => state.countryArticles
  );
  const [page, setPage] = useState<number>(1);
  const placeholderImage = "/no-image.svg";

  useEffect(() => {
    if (country) {
      dispatch(fetchArticlesByCountry({ country, page }));
    }
  }, [country, page, dispatch]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading) {
    return (
      <h2 className="mt-4 p-4">
        <Loading />
      </h2>
    );
  }

  if (error) {
    return <CustomError error={error} />;
  }

  return (
    <div className="news-container">
      <div className="content-container py-5">
        <h2>
          {icon} News from {country?.toUpperCase()}
        </h2>
        <div className="row bg-white p-4 mt-5">
          {articles.map((article: Article, index: number) => (
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
                  className="page-link btn btn-primary"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
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
                className={`page-item ${page === totalPages ? "disabled" : ""}`}
              >
                <button
                  type="button"
                  className=" page-link "
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
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

export default CountryNews;
