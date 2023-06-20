import { fetchAnime } from "@app/reducers/animeSlice";
import AnimeCard from "@components/AnimeCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Carousel from "@components/Carousel";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Loading from "@components/Loading";

function Anime() {
  const dispatch = useDispatch();
  const { ANIME, status, error } = useSelector((state) => state.anime);

  useEffect(() => {
    dispatch(fetchAnime());
  }, [dispatch]);

  const anime = (
    <Carousel>
      {ANIME.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <AnimeCard data={item} />
          </SwiperSlide>
        );
      })}
    </Carousel>
  );

  return (
    <main id="anime">
      <h1>Anime</h1>
      <section className="container">
        {status === "loading" && <Loading />}
        {status === "success" && anime}
        {status === "error" && <Error error={error} />}
      </section>
    </main>
  );
}

export default Anime;
