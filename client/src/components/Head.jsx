import React from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm, setYear } from "@app/services/mediaSlice.js";
import { setAnimeYear, setSeason } from "@app/services/animeSlice.js";
import { useLocation } from "react-router-dom";

function Head({ name }) {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();
  const { pathname } = useLocation();

  const handleSearch = (e) => {
    if (pathname === "/anime") dispatch(setSeason(e.target.value));
    else dispatch(setSearchTerm(e.target.value));
  };

  const handleYear = (e) => {
    if (pathname === "/anime") dispatch(setAnimeYear(e.target.value));
    else dispatch(setYear(e.target.value));
  };

  const DATE = Array.from(
    { length: currentYear - 1999 },
    (_, index) => 2000 + index
  );
  const KEY =
    pathname === "/anime"
      ? ["Summer", "Spring", "Winter", "Fall"]
      : ["Action", "Romance", "Mystry", "Fantasy"];

  const GENRE = [
    "Romance",
    "Action",
    "Adventure",
    "Comedy",
    "Fantasy",
    "Mystery",
  ];

  return (
    <section className="head">
      <h1>{name}</h1>
      <div className="filter">
        <select id="keyword" onChange={handleSearch}>
          {KEY.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select id="date" onChange={handleYear} defaultValue={currentYear}>
          {DATE.map((item, index) => (
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
