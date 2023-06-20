import React from "react";
import { Link } from "react-router-dom";

function Card({ data }) {
  const { Title, Year, imdbID, Type, Poster } = data;
  const truncatedTitle =
    Title.length > 25 ? Title.substring(0, 25) + "..." : Title;

  return (
    <Link to={`/details/${imdbID}`} className="card">
      <div className="poster">
        <img src={Poster} alt="poster" loading="lazy" />
      </div>
      <div className="info">
        <h2 className="title">{truncatedTitle}</h2>
        <span className="year">{Year}</span>
      </div>
    </Link>
  );
}

export default Card;
