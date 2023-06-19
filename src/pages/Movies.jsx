import { fetchMovies } from "@app/reducers/showSlice";
import Card from "@components/Card";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { SwiperSettings } from "@components/Setting";

function Movies() {
  const dispatch = useDispatch();
  const { MOVIES, status, error } = useSelector((state) => state.shows);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const movies = (
    <Swiper {...SwiperSettings}>
      {MOVIES.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <Card data={item} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );

  return (
    <main id="movies">
      <h1>Movies</h1>
      {status === "loading" && <div className="loading">Loading...</div>}
      {status === "success" && movies}
      {status === "error" && <div>{error}</div>}
    </main>
  );
}

export default Movies;
