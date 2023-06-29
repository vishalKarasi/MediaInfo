import { fetchSeries } from "@app/reducers/showSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Carousel from "@components/Carousel";
import Loading from "@components/Loading";
import Error from "@components/Error";
import MediaCard from "@components/MediaCard";
import Head from "@components/Head";

function Series() {
  const dispatch = useDispatch();
  const { SERIES, status, error } = useSelector((state) => state.shows);

  useEffect(() => {
    dispatch(fetchSeries());
  }, [dispatch]);

  const series = (
    <Carousel>
      {!SERIES || SERIES.length === 0 ? (
        <Error error="NO MATCH" />
      ) : (
        SERIES.map((item, index) => (
          <SwiperSlide key={index}>
            <MediaCard data={item} type="series" />
          </SwiperSlide>
        ))
      )}
    </Carousel>
  );

  return (
    <main id="series">
      <Head name="Series" />
      {status === "loading" && <Loading />}
      {status === "success" && series}
      {status === "error" && <Error error={error} />}
    </main>
  );
}

export default Series;
