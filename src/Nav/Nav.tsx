import React, { useState } from "react";
import "./Nav.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';


function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar">

      <button className="navbar-toggle" onClick={toggleMenu}>

        {showMenu ? <FaTimes /> : <FaBars />}
      </button>
      <ul
        className={
          showMenu ? "navbar-links navbar-links-show" : "show navbar-links"
        }
      >
        <li onClick={toggleMenu}>
          <Link to={"/"}>Home</Link>
        </li>
        <li onClick={toggleMenu}>
          <Link to={"/form"}>Vendor Onboarding Form</Link>
        </li>
        <li onClick={toggleMenu}>
          <Link to={"/stores"}>All Stores</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
