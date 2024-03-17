import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location= useLocation();


  return (
    <nav>
      <ul>
        <li>
          {location.pathname === "/" ? <b>Home</b> : <Link to="/gamehub">Gamehub</Link>}
        </li>
        {location.pathname !== "/" && <li><Link to="/">Log Out</Link></li>}
      </ul>
    </nav>
  );
}

export default Navbar;
