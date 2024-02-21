import { getMedia } from "@app/services/mediaSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "@components/Carousel.jsx";
import MediaCard from "@components/MediaCard.jsx";
import Head from "@components/Head.jsx";
import Model from "@components/Model.jsx";

function Series() {
  const dispatch = useDispatch();
  const { MEDIA, searchTerm, year, status, error } = useSelector(
    (state) => state.media
  );
  useEffect(() => {
    dispatch(getMedia({ type: "series", searchTerm, year }));
  }, [dispatch, searchTerm, year]);

  const series = (
    <Carousel>
      {MEDIA.map((item) => (
        <MediaCard data={item} type="series" key={item.id} />
      ))}
    </Carousel>
  );

  return (
    <main id="series">
      <Head name="Series" />
      {status === "loading" && <Model type="loading" />}
      {status === "success" && series}
      {status === "error" && <Model type="error" message={error} />}
    </main>
  );
}

export default Series;
