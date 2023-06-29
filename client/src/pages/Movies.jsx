import React, { useEffect } from "react";
import { fetchMovies } from "@app/reducers/showSlice";
import { useDispatch, useSelector } from "react-redux";
import { SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import Carousel from "@components/Carousel";
import Loading from "@components/Loading";
import Error from "@components/Error";
import MediaCard from "@components/MediaCard";
import Head from "@components/Head";

function Movies() {
  const dispatch = useDispatch();
  const { MOVIES, status, error } = useSelector((state) => state.shows);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const movies = (
    <Carousel>
      {!MOVIES || MOVIES.length === 0 ? (
        <Error error="NO MATCH" />
      ) : (
        MOVIES.map((item, index) => (
          <SwiperSlide key={index}>
            <MediaCard data={item} type="movie" />
          </SwiperSlide>
        ))
      )}
    </Carousel>
  );

  return (
    <main id="movies">
      <Head name="Movies" />
      {status === "loading" && <Loading />}
      {status === "success" && movies}
      {status === "error" && <Error error={error} />}
    </main>
  );
}

export default Movies;
