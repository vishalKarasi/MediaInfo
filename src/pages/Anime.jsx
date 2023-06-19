import { fetchAnime } from "@app/reducers/animeSlice";
import AnimeCard from "@components/AnimeCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Anime() {
  const dispatch = useDispatch();
  const { ANIME, status, error } = useSelector((state) => state.anime);

  useEffect(() => {
    dispatch(fetchAnime());
  }, [dispatch]);

  const anime = ANIME.map((item, index) => {
    return <AnimeCard data={item} key={index} />;
  });

  return (
    <main id="anime">
      <h1>Anime</h1>
      <section className="container">
        {status === "loading" && <div className="loading">Loading...</div>}
        {status === "success" && anime}
        {status === "error" && <div>{error}</div>}
      </section>
    </main>
  );
}

export default Anime;
