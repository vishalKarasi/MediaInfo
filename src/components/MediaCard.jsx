import React from "react";
import { Link } from "react-router-dom";

function MediaCard({ data, type }) {
  let to, title, poster, year;

  if (type === "anime") {
    to = `/animeDetails/${data.mal_id}`;
    title = data.title;
    poster = data.images.jpg.large_image_url;
    year = data.year;
  } else if (type === "movie" || type === "series") {
    to = `/details/${data.imdbID}`;
    title = data.Title;
    poster = data.Poster;
    year = data.Year;
  }

  const trimTitle = title.length > 25 ? title.substring(0, 25) + "..." : title;

  return (
    <Link to={to} className="card">
      <div className="poster">
        <img src={poster} alt="poster" loading="lazy" />
      </div>
      <div className="info">
        <h2 className="title" title={title}>
          {trimTitle}
        </h2>
        <span className="year">{year}</span>
      </div>
    </Link>
  );
}

export default MediaCard;
