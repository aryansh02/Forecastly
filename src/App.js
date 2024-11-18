import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import WeatherTable from "./components/WeatherTable";
import SearchForm from "./components/SearchForm";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

const cities = [
  { name: "Bangalore", rowId: "bangaloreRow" },
  { name: "Chennai", rowId: "chennaiRow" },
  { name: "Delhi", rowId: "delhiRow" },
  { name: "Jaipur", rowId: "jaipurRow" },
  { name: "Kolkata", rowId: "kolkataRow" },
  { name: "Mumbai", rowId: "mumbaiRow" },
  { name: "Shimla", rowId: "shimlaRow" },
];

const getBackgroundImage = (hour) => {
  if (hour >= 5 && hour < 12) {
    return require("./assets/Morning.webp");
  } else if (hour >= 12 && hour < 18) {
    return require("./assets/Afternoon.webp");
  } else if (hour >= 18 && hour < 20) {
    return require("./assets/Evening.webp");
  } else {
    return require("./assets/Night.webp");
  }
};

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [selectedCityWeather, setSelectedCityWeather] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [background, setBackground] = useState("");

  const apiKey = "80e7bbc5b3ee9906fda8459e0b600e5f";

  const fetchWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    const getWeatherData = async () => {
      let data = {};
      for (const city of cities) {
        const weather = await fetchWeatherData(city.name);
        data[city.rowId] = weather;
      }
      setWeatherData(data);
    };
    getWeatherData();
  }, []);

  const handleCitySearch = async (city) => {
    const weather = await fetchWeatherData(city);
    setSelectedCityWeather(weather);
    setSelectedCity(city);

    const localTime = new Date().getUTCHours() + weather.timezone / 3600;
    const adjustedHour = localTime >= 24 ? localTime - 24 : localTime;
    setBackground(getBackgroundImage(adjustedHour));
  };

  useEffect(() => {
    const currentHour = new Date().getHours();
    setBackground(getBackgroundImage(currentHour));
  }, []);

  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar onSearch={handleCitySearch} />
      {selectedCityWeather && (
        <div className="weather-results-container">
          <WeatherCard cityName={selectedCity} weather={selectedCityWeather} />
        </div>
      )}
      <WeatherTable weatherData={weatherData} />
    </div>
  );
}

export default App;
