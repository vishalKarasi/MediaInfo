import React, { useEffect } from "react";
import { fetchShowById, removeSelectedShow } from "@app/reducers/showSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaStar, FaThumbsUp, FaFilm, FaCalendarAlt } from "react-icons/fa";
import Loading from "./Loading";
import Error from "./Error";

function Detail() {
  const dispatch = useDispatch();
  const { selectedShow, status, error } = useSelector((state) => state.shows);
  console.log(selectedShow);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchShowById(id));
    return () => {
      dispatch(removeSelectedShow());
    };
  }, [dispatch, id]);

  const details = (
    <>
      <section className="left">
        <h1 className="title">{selectedShow.Title}</h1>
        <article>
          <div>
            <span>Rating:</span>
            <i>
              {selectedShow.imdbRating}
              <FaStar />
            </i>
          </div>
          <div>
            <span>Likes:</span>
            <i>
              {selectedShow.imdbVotes}
              <FaThumbsUp />
            </i>
          </div>
          <div>
            <span>Runtime:</span>
            <i>
              {selectedShow.Runtime}

              <FaFilm />
            </i>
          </div>
          <div>
            <span>Year:</span>
            <i>
              {selectedShow.Year}
              <FaCalendarAlt />
            </i>
          </div>
        </article>
        <p className="plot">
          <span>Plot: </span> {selectedShow.Plot}
        </p>
        <article className="info">
          <div>
            <span>Director:</span> {selectedShow.Director}
          </div>
          <div>
            <span>Actors:</span> {selectedShow.Actors}
          </div>
          <div>
            <span>Genres:</span> {selectedShow.Genre}
          </div>
          <div>
            <span>Languages:</span> {selectedShow.Language}
          </div>
          <div>
            <span>Awards:</span> {selectedShow.Awards}
          </div>
          <div>
            <span>Type:</span> {selectedShow.Type}
          </div>
        </article>
      </section>
      <section className="right">
        <img src={selectedShow.Poster} alt={selectedShow.Title} />
      </section>
    </>
  );

  return (
    <main id="selectedShow">
      {status === "loading" && <Loading />}
      {status === "success" && details}
      {status === "error" && <Error error={error} />}
    </main>
  );
}

export default Detail;
