import { fetchAnime } from "@app/reducers/animeSlice";
import { fetchMovies, fetchSeries } from "@app/reducers/showSlice";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function Head({ name }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [key, setKey] = useState(2023);

  const handleSelect = (e) => {
    setKey(e.target.value);
  };

  useEffect(() => {
    if (location.pathname === "/movies") {
      dispatch(fetchMovies(key));
    } else if (location.pathname === "/series") {
      dispatch(fetchSeries(key));
    } else if (location.pathname === "/anime") {
      dispatch(fetchAnime(key));
    }
  }, [key]);

  const currentYear = new Date().getFullYear();
  const DATE = Array.from(
    { length: currentYear - 1999 },
    (_, index) => 2000 + index
  );
  const KEY = ["Popular", "Mostview", "Rate"];

  const GENRE = [
    "Action",
    "Adventure",
    "Comedy",
    "Fantasy",
    "Sci-fi",
    "Mystery",
  ];

  return (
    <section className="head">
      <h1>{name}</h1>
      <div className="filter">
        <select id="keywordDD" onChange={handleSelect}>
          {KEY.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select id="dateDD" onChange={handleSelect} defaultValue={currentYear}>
          {DATE.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select id="genreDD" onChange={handleSelect}>
          {GENRE.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}

export default Head;
