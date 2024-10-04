import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiMoviePlay, BiCameraMovie } from "react-icons/bi";
import { FaFire, FaSearch, FaTimes } from "react-icons/fa";
import NavLinks from "@components/NavLinks.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@app/services/authSlice.js";
import { getAnimeBySearchterm } from "@app/services/animeSlice.js";
import { setSearchTerm } from "@app/services/mediaSlice.js";

function Header() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [searchVal, setSearchVal] = useState("");
  const [visible, setVisiblity] = useState(false);
  const navigate = useNavigate();

  const NAVLINKS = [
    { label: "Movies", icon: <BiCameraMovie />, path: "/movies" },
    { label: "Series", icon: <BiMoviePlay />, path: "/series" },
    { label: "Anime", icon: <FaFire />, path: "/anime" },
  ];

  const handleSearch = () => {
    if (searchVal) {
      if (pathname === "/anime") {
        dispatch(getAnimeBySearchterm(searchVal));
      } else dispatch(setSearchTerm(searchVal));
    }
    setSearchVal("");
  };

  return (
    <header id="header">
      <Link to="/">
        <div className="logo">MediaInfo</div>
      </Link>

      <nav className={`navbar ${visible ? "active" : ""}`}>
        {NAVLINKS.map((link, index) => (
          <NavLinks link={link} key={index} />
        ))}
      </nav>

      {["/movies", "/series", "/anime"].includes(pathname) && (
        <div className="searchbar">
          <div className="search">
            <button type="submit" onClick={() => handleSearch()}>
              <FaSearch />
            </button>
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search for media"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                setSearchVal("");
              }}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      <menu className="menu">
        {Boolean(user) ? (
          <>
            <Link
              className="button"
              onClick={() => {
                dispatch(logout()).then(() => navigate("/auth"));
              }}
            >
              Logout
            </Link>
            <Link to="/profile" className="profilePic">
              <img src={user.profilePic} alt="profile" />
            </Link>
          </>
        ) : (
          <Link to="/auth" className="button">
            Login
          </Link>
        )}

        <div
          className="hamburger"
          onClick={() => {
            setVisiblity(!visible);
          }}
        >
          <div className={`line ${visible ? "active" : ""}`}></div>
        </div>
      </menu>
    </header>
  );
}

export default Header;
