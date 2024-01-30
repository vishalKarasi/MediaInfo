import React, { useEffect } from "react";
import { getMediaById, removeSelectedMedia } from "@app/services/mediaSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaStar, FaThumbsUp, FaFilm, FaCalendarAlt } from "react-icons/fa";
import Model from "./Model.jsx";

function Details() {
  const dispatch = useDispatch();
  const { selectedMedia, status, error } = useSelector((state) => state.media);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getMediaById(id));
    return () => {
      dispatch(removeSelectedMedia());
    };
  }, [dispatch, id]);

  const details = (
    <>
      <section className="left">
        <h1 className="title">{selectedMedia.Title}</h1>
        <article>
          <div>
            <span>Rating:</span>
            <i>
              {selectedMedia.imdbRating}
              <FaStar />
            </i>
          </div>
          <div>
            <span>Likes:</span>
            <i>
              {selectedMedia.imdbVotes}
              <FaThumbsUp />
            </i>
          </div>
          <div>
            <span>Runtime:</span>
            <i>
              {selectedMedia.Runtime}

              <FaFilm />
            </i>
          </div>
          <div>
            <span>Year:</span>
            <i>
              {selectedMedia.Year}
              <FaCalendarAlt />
            </i>
          </div>
        </article>
        <p className="plot">
          <span>Plot: </span> {selectedMedia.Plot}
        </p>
        <article className="info">
          <div>
            <span>Director:</span> {selectedMedia.Director}
          </div>
          <div>
            <span>Actors:</span> {selectedMedia.Actors}
          </div>
          <div>
            <span>Genres:</span> {selectedMedia.Genre}
          </div>
          <div>
            <span>Languages:</span> {selectedMedia.Language}
          </div>
          <div>
            <span>Awards:</span> {selectedMedia.Awards}
          </div>
          <div>
            <span>Type:</span> {selectedMedia.Type}
          </div>
        </article>
      </section>
      <section className="right">
        <img src={selectedMedia.Poster} alt={selectedMedia.Title} />
      </section>
    </>
  );

  return (
    <main id="selectedMedia">
      {status === "loading" && <Model type="loading" />}
      {status === "success" && details}
      {status === "error" && <Model type="error" message={error} />}
    </main>
  );
}

export default Details;
