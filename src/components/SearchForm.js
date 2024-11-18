import React, { useState } from "react";
import "./SearchForm.css";
import searchIcon from "../assets/Search Icon.png";

const SearchForm = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search"
          className="search-input"
        />
        <button type="submit" className="search-button">
          <img src={searchIcon} alt="Search" className="search-icon" />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
