import React, { useEffect } from "react";

import Card from "@components/Card";
import { fetchMovies } from "@app/reducers/showSlice";
import { useDispatch, useSelector } from "react-redux";
import { SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import Carousel from "@components/Carousel";
import Loading from "@components/Loading";
import Error from "@components/Error";

function Movies() {
  const dispatch = useDispatch();
  const { MOVIES, status, error } = useSelector((state) => state.shows);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const movies = (
    <Carousel>
      {MOVIES.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <Card data={item} />
          </SwiperSlide>
        );
      })}
    </Carousel>
  );

  return (
    <main id="movies">
      <h1>Movies</h1>
      {status === "loading" && <Loading />}
      {status === "success" && movies}
      {status === "error" && <Error error={error} />}
    </main>
  );
}

export default Movies;
