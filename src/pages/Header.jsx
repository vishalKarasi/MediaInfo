import React from "react";
import { Link } from "react-router-dom";
import profile from "@assets/images/pfp.png";
import { BiMoviePlay, BiCameraMovie } from "react-icons/bi";
import { FaFire } from "react-icons/fa";
import NavLinks from "@components/NavLinks";

function Header() {
  const NAVLINKS = [
    { label: "Movies", icon: <BiCameraMovie />, path: "/movies" },
    { label: "Series", icon: <BiMoviePlay />, path: "/series" },
    { label: "Anime", icon: <FaFire />, path: "/anime" },
  ];

  return (
    <header id="header">
      <Link to="/">
        <div className="logo">Movie App</div>
      </Link>

      <nav>
        {NAVLINKS.map((link, index) => (
          <NavLinks link={link} key={index} />
        ))}
      </nav>

      <div className="profileContainer">
        <img src={profile} alt="profile" />
      </div>
    </header>
  );
}

export default Header;
