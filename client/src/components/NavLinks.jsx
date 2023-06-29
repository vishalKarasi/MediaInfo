import React from "react";
import { NavLink } from "react-router-dom";

function NavLinks({ link }) {
  const { label, icon, path } = link;

  return (
    <li className="navLink">
      <NavLink to={path} activeclassname="active">
        {icon && <span className="navIcon">{icon}</span>}
        {label && <span className="navLabel">{label}</span>}
      </NavLink>
    </li>
  );
}

export default NavLinks;
