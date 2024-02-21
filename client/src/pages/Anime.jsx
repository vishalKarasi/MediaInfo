import { getSeasonalAnime } from "@app/services/animeSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "@components/Carousel.jsx";
import MediaCard from "@components/MediaCard.jsx";
import Head from "@components/Head.jsx";
import Model from "@components/Model.jsx";

function Anime() {
  const dispatch = useDispatch();
  const { ANIME, year, season, status, error } = useSelector(
    (state) => state.anime
  );

  useEffect(() => {
    dispatch(getSeasonalAnime({ year, season }));
  }, [dispatch, year, season]);

  const anime = (
    <Carousel>
      {ANIME.map((item) => (
        <MediaCard data={item} type="anime" key={item.id} />
      ))}
    </Carousel>
  );

  return (
    <main id="anime">
      <Head name="Anime" />
      {status === "loading" && <Model type="loading" />}
      {status === "success" && anime}
      {status === "error" && <Model type="error" message={error} />}
    </main>
  );
}

export default Anime;
