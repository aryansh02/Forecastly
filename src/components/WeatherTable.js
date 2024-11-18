import React from "react";
import "./WeatherTable.css";

const WeatherTable = ({ weatherData }) => {
  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  const getCityName = (rowId) => {
    switch (rowId) {
      case "bangaloreRow":
        return "Bangalore";
      case "chennaiRow":
        return "Chennai";
      case "delhiRow":
        return "Delhi";
      case "jaipurRow":
        return "Jaipur";
      case "kolkataRow":
        return "Kolkata";
      case "mumbaiRow":
        return "Mumbai";
      case "shimlaRow":
        return "Shimla";
      default:
        return rowId;
    }
  };

  return (
    <div className="weather-table-container">
      <h2>Local Weather Forecast</h2>
      <table className="weather-table">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>Weather</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(weatherData).map(([rowId, data]) => (
            <tr key={rowId}>
              <td>{getCityName(rowId)}</td>
              <td>{data.main ? `${data.main.temp}°C` : "N/A"}</td>
              <td>
                {data.weather ? capitalize(data.weather[0].description) : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherTable;
