import React from "react";
import { Article } from "../../types/types";
import "../../App.css";
import { Link } from "react-router-dom";

interface NewsCardProps {
  article: Article;
  placeholderImage: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, placeholderImage }) => {
  const {
    title = "Title not available",
    description = "Description not available",
    url,
    urlToImage,
    source,
    publishedAt,
  } = article;

  return (
    <div className="article mb-4 pb-4 border-bottom ">
      <div className="row ">
        <div className="col-md-3 ">
          <img
            src={urlToImage || placeholderImage}
            className={`rounded-3 img-fluid ${
              !urlToImage ? "placeholder-img m-auto" : ""
            }`}
            alt={title}
          />
        </div>
        <div className="col-md-9">
          <h5>{title}</h5>
          <p>{description}</p>
          <div className="text-muted">
            Source: {source.name} | Published:{" "}
            {new Date(publishedAt).toLocaleDateString()}
          </div>
          <Link
            to={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-2"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
