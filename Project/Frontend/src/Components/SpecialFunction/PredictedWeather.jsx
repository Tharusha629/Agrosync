import React from "react";
import "./PredictedWeather.css"; 

const PredictedWeather = ({ predictedWeather }) => (
  <div className="predicted-weather-container">
    <h2 className="predicted-weather-title">Predicted Weather</h2>
    {Array.isArray(predictedWeather) && predictedWeather.length > 0 ? (
      <div className="weather-grid">
        {predictedWeather.map((day, index) => (
          <div key={index} className="weather-card-incontainer">
            <p className="weather-date-incontainer">
              {new Date(day.date).toLocaleDateString()}
            </p>
            <p className="weather-temp-incontainer">{day.temp}°C</p>
          </div>
        ))}
      </div>
    ) : (
      <p className="loading-text">Loading predictions...</p>
    )}
  </div>
);

export default PredictedWeather;
