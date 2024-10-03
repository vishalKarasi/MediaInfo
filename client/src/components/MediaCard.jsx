import React, { useState, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaBookmark, FaCalendar, FaStar, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { populateFavorite, updateFavorite } from "@app/services/authSlice";

function MediaCard({ data, type }) {
  const dispatch = useDispatch();
  const { id, title, poster, year, rating } = data;
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const to = type === "anime" ? `/animeDetails/${id}` : `/details/${id}`;
  const trimTitle = title.length > 25 ? title.substring(0, 15) + "..." : title;

  const isFavorite = Boolean(user?.favorite[id]);

  const handleUpdateFavorite = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      await dispatch(updateFavorite({ mediaId: id, type }));
      await dispatch(populateFavorite());
      setLoading(false);
    },
    [dispatch, id, type]
  );

  return (
    <Link to={to} className="card">
      {user && (
        <button
          className={`cardOption ${isFavorite ? "trash" : "fav"}`}
          onClick={handleUpdateFavorite}
          disabled={loading}
        >
          {isFavorite ? <FaTrash /> : <FaBookmark />}
        </button>
      )}
      <div className="poster">
        <img src={poster} alt="poster" loading="lazy" />
      </div>
      <div className="info">
        <h2 className="title" title={title}>
          {trimTitle}
        </h2>
        <div className="rate">
          <span>
            {year}
            <FaCalendar />
          </span>
          <span>
            {rating}
            <FaStar />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default memo(MediaCard);
