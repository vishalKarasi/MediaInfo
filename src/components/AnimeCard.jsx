import React from "react";
import { Link } from "react-router-dom";

function AnimeCard({ data }) {
  const { mal_id, title, images, year } = data;
  const truncatedTitle =
    title.length > 40 ? title.substring(0, 40) + "..." : title;

  return (
    <Link to={`/details/${mal_id}`} className="card">
      <div className="poster">
        <img src={images.jpg.large_image_url} alt="poster" loading="lazy" />
      </div>
      <div className="info">
        <h2 className="title" title={title}>
          {truncatedTitle}
        </h2>
        <span className="year">{year}</span>
      </div>
    </Link>
  );
}

export default AnimeCard;
