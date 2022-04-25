import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav
    style={{
      borderBottom: "solid 1px",
      paddingBottom: "1rem",
    }}
  >
    <Link to="/">Home</Link> | <Link to="/table">Table</Link> |{" "}
    <Link to="/chart">Chart</Link>
  </nav>
);

export default NavBar;
