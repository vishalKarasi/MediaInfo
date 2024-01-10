import React, { useEffect } from "react";
import { getMedia } from "@app/services/mediaSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "@components/Carousel.jsx";
import MediaCard from "@components/MediaCard.jsx";
import Head from "@components/Head.jsx";
import Model from "@components/Model.jsx";

function Movies() {
  const dispatch = useDispatch();
  const { MEDIA, searchTerm, year, status, error } = useSelector(
    (state) => state.media
  );

  useEffect(() => {
    dispatch(getMedia({ type: "movie", searchTerm, year }));
  }, [dispatch, searchTerm, year]);

  const movies = (
    <Carousel>
      {MEDIA.map((item, index) => (
        <MediaCard data={item} type="movie" key={index} />
      ))}
    </Carousel>
  );

  return (
    <main id="movies">
      <Head name="Movies" />
      {status === "loading" && <Model type="loading" />}
      {status === "success" && movies}
      {status === "error" && <Model type="error" message={error} />}
    </main>
  );
}

export default Movies;
