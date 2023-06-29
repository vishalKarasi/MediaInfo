import { fetchAnime } from "@app/reducers/animeSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "@components/Carousel";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Loading from "@components/Loading";
import MediaCard from "@components/MediaCard";
import Head from "@components/Head";
import Error from "@components/Error";

function Anime() {
  const dispatch = useDispatch();
  const { ANIME, status, error } = useSelector((state) => state.anime);

  useEffect(() => {
    dispatch(fetchAnime());
  }, [dispatch]);

  const anime = (
    <Carousel>
      {!ANIME || ANIME.length === 0 ? (
        <Error error="NO MATCH" />
      ) : (
        ANIME.map((item, index) => (
          <SwiperSlide key={index}>
            <MediaCard data={item} type="anime" />
          </SwiperSlide>
        ))
      )}
    </Carousel>
  );

  return (
    <main id="anime">
      <Head name="Anime" />
      {status === "loading" && <Loading />}
      {status === "success" && anime}
      {status === "error" && <Error error={error} />}
    </main>
  );
}

export default Anime;
