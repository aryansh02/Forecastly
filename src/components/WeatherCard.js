import React from "react";
import "./WeatherCard.css";

function WeatherCard({ cityName, weather }) {
  const getLocalTime = (timezoneOffset) => {
    const utcTime =
      new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localTime = new Date(utcTime + timezoneOffset * 1000);
    return localTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const localTime = getLocalTime(weather.timezone);

  return (
    <div className="weather-card">
      <h2>
        {weather.weather[0].description.charAt(0).toUpperCase() +
          weather.weather[0].description.slice(1)}
      </h2>
      <h3>{cityName}</h3>
      <div className="weather-info">
        <p>
          <span>Temperature:</span> <span>{weather.main.temp}°C</span>
        </p>
        <p>
          <span>Feels Like:</span> <span>{weather.main.feels_like}°C</span>
        </p>
        <p>
          <span>Humidity:</span> <span>{weather.main.humidity}%</span>
        </p>
        <p>
          <span>Wind Speed:</span> <span>{weather.wind.speed} Km/h</span>
        </p>
        <p>
          <span>Time:</span> <span>{localTime}</span>
        </p>
      </div>
    </div>
  );
}

export default WeatherCard;
