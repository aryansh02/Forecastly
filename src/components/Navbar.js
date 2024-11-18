import React from "react";

import SearchForm from "./SearchForm";

const Navbar = ({ onSearch }) => {
  return (
    <nav className="navbar">
      <h1>Forecastly</h1>
      <SearchForm onSearch={onSearch} />{" "}
    </nav>
  );
};

export default Navbar;
