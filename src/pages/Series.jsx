import { fetchSeries } from "@app/reducers/showSlice";
import Card from "@components/Card";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { SwiperSettings } from "@components/Setting";

function Series() {
  const dispatch = useDispatch();
  const { SERIES, status, error } = useSelector((state) => state.shows);

  useEffect(() => {
    dispatch(fetchSeries());
  }, [dispatch]);

  const series = (
    <Swiper {...SwiperSettings}>
      {SERIES.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <Card data={item} />;
          </SwiperSlide>
        );
      })}
    </Swiper>
  );

  return (
    <main id="series">
      <h1>Series</h1>
      {status === "loading" && <div className="loading">Loading...</div>}
      {status === "success" && series}
      {status === "error" && <div>{error}</div>}
    </main>
  );
}

export default Series;
