import { fetchAnimeById, removeSelectedAnime } from "@app/reducers/animeSlice";
import React, { useEffect } from "react";
import { FaCalendarAlt, FaFilm, FaStar, FaThumbsUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";

function AnimeDetails() {
  const dispatch = useDispatch();
  const { selectedAnime, status, error } = useSelector((state) => state.anime);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchAnimeById(id));
    return () => {
      dispatch(removeSelectedAnime());
    };
  }, [dispatch, id]);

  const animeDetails = (
    <>
      <section className="left">
        <h1 className="title">{selectedAnime.title}</h1>
        <article>
          <div>
            <span>Rating:</span>
            <i>
              {selectedAnime.score}
              <FaStar />
            </i>
          </div>
          <div>
            <span>Likes:</span>
            <i>
              {selectedAnime.favorites}
              <FaThumbsUp />
            </i>
          </div>
          <div>
            <span>Runtime:</span>
            <i>
              {selectedAnime.duration}
              <FaFilm />
            </i>
          </div>
          <div>
            <span>Year:</span>
            <i>
              {selectedAnime.year}
              <FaCalendarAlt />
            </i>
          </div>
        </article>
        <p className="plot">
          <span>Plot: </span> {selectedAnime.synopsis}
        </p>
        <article className="info">
          <div>
            <span>Studio:</span>
            {selectedAnime.studios &&
              selectedAnime.studios.map((studio) => studio.name).join(", ")}
          </div>
          <div>
            <span>Season:</span> {selectedAnime.season}
          </div>
          <div>
            <span>Genres:</span>
            {selectedAnime.genres &&
              selectedAnime.genres.map((genre) => genre.name).join(", ")}
          </div>
          <div>
            <span>Episodes:</span> {selectedAnime.episodes}
          </div>
          <div>
            <span>Rank:</span> {selectedAnime.rank}
          </div>
          <div>
            <span>Type:</span> {selectedAnime.type}
          </div>
        </article>
      </section>
      <section className="right">
        {selectedAnime.images?.jpg?.large_image_url && (
          <img
            src={selectedAnime.images.jpg.large_image_url}
            alt={selectedAnime.title}
          />
        )}
      </section>
    </>
  );

  return (
    <main id="selectedShow">
      {status === "loading" && <Loading />}
      {status === "success" && animeDetails}
      {status === "error" && <Error error={error} />}
    </main>
  );
}

export default AnimeDetails;
