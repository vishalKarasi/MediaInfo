import React, { memo } from "react";
import { FaBookmark, FaCalendar, FaStar, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { updateWatchlist } from "@app/services/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

function MediaCard({ data, type }) {
  const dispatch = useDispatch();
  const { id, title, poster, year, rating } = data;
  const { accessToken, userId } = useSelector((state) => state.auth);
  const { USER } = useSelector((state) => state.user);
  const to = type === "anime" ? `/animeDetails/${id}` : `/details/${id}`;
  const trimTitle = title.length > 25 ? title.substring(0, 15) + "..." : title;
  const isFavorite = USER.watchlist.some((item) => item?.id === id);

  return (
    <Link to={to} className="card">
      {accessToken && (
        <button
          className={`cardOption ${isFavorite ? "trash" : "favorite"}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(updateWatchlist({ userId, mediaId: id, type }));
          }}
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
