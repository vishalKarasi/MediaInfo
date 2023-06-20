import { fetchSeries } from "@app/reducers/showSlice";
import Card from "@components/Card";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Carousel from "@components/Carousel";
import Loading from "@components/Loading";
import Error from "@components/Error";

function Series() {
  const dispatch = useDispatch();
  const { SERIES, status, error } = useSelector((state) => state.shows);

  useEffect(() => {
    dispatch(fetchSeries());
  }, [dispatch]);

  const series = (
    <Carousel>
      {SERIES.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <Card data={item} />;
          </SwiperSlide>
        );
      })}
    </Carousel>
  );

  return (
    <main id="series">
      <h1>Series</h1>
      {status === "loading" && <Loading />}
      {status === "success" && series}
      {status === "error" && <Error error={error} />}
    </main>
  );
}

export default Series;
