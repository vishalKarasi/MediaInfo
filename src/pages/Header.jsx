import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import profile from "@assets/images/pfp.png";
import { BiMoviePlay, BiCameraMovie } from "react-icons/bi";
import { FaFire, FaSearch, FaTimes } from "react-icons/fa";
import NavLinks from "@components/NavLinks";
import { useDispatch } from "react-redux";
import { fetchMovies, fetchSeries } from "@app/reducers/showSlice";

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const NAVLINKS = [
    { label: "Movies", icon: <BiCameraMovie />, path: "/movies" },
    { label: "Series", icon: <BiMoviePlay />, path: "/series" },
    { label: "Anime", icon: <FaFire />, path: "/anime" },
  ];

  const handleSearch = () => {
    if (location.pathname === "/movies") {
      dispatch(fetchMovies(searchTerm));
    } else if (location.pathname === "/series") {
      dispatch(fetchSeries(searchTerm));
    }
    setSearchTerm("");
  };

  return (
    <header id="header">
      <Link to="/">
        <div className="logo">MovieApp</div>
      </Link>

      <nav className="navBar">
        {NAVLINKS.map((link, index) => (
          <NavLinks link={link} key={index} />
        ))}
      </nav>

      <div className="search">
        <button type="submit" onClick={() => handleSearch()}>
          <FaSearch />
        </button>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for show/anime"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            setSearchTerm("");
          }}
        >
          <FaTimes />
        </button>
      </div>

      <div className="profile">
        <img src={profile} alt="profile" />
      </div>

      <div className="hamburger">
        <div className="line"></div>
      </div>
    </header>
  );
}

export default Header;
