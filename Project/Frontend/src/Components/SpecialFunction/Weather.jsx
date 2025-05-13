/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { predictNextWeekWeather } from "../../utils/weatherPrediction";
import PestRiskIndicator from "./PestRiskIndicator";
import WeatherChart from "./WeatherChart";
import PredictedWeather from "./PredictedWeather";
import Chatbot from "./Chatbox";
import "./Weather.css"; 

const Weather = () => {
  const navigate = useNavigate();
  const [forecast, setForecast] = useState([]);
  const [predictedWeather, setPredictedWeather] = useState([]);
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [cityInput, setCityInput] = useState("");
  const [rainfall, setRainfall] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [date, setDate] = useState("");

  const fetchWeatherData = async () => {
    if (!latitude || !longitude) return;

    const ApiKey = "1422877730cd89a17ff7564aabe8a13d";
    const apiWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&cnt=7&units=metric&appid=${ApiKey}`;
    const apiForecast = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=7&units=metric&appid=${ApiKey}`;

    try {
      const ForcatResponse = await axios.get(apiForecast);
      const ForcastData = ForcatResponse.data;

      const WeatherResponse = await axios.get(apiWeather);
      const WeatherData = WeatherResponse.data;

      setCity(ForcastData.city.name);
      setForecast(ForcastData.list);
      setHumidity(WeatherData.main.humidity);
      setTemperature(WeatherData.main.temp);
      setRainfall(WeatherData.rain ? WeatherData.rain["1h"] : 0);

      const { predictedWeather } = predictNextWeekWeather(ForcastData.list);
      setPredictedWeather(predictedWeather || []);

      const today = new Date();
      setDate(today.toLocaleDateString());
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCityCoordinates = async () => {
    const ApiKey = "1422877730cd89a17ff7564aabe8a13d";
    const geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${ApiKey}`;

    try {
      const response = await axios.get(geoApiUrl);
      const data = response.data;
      setLatitude(data.coord.lat);
      setLongitude(data.coord.lon);
    } catch (error) {
      console.log("Error fetching coordinates:", error);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeatherData();
    }
  }, [latitude, longitude]);

  const handleCityChange = (e) => {
    setCityInput(e.target.value);
  };

  const handleSearch = () => {
    if (cityInput) {
      setCity(cityInput);
      fetchCityCoordinates();
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="weather-wrapper">
      <button onClick={handleGoBack} className="back-button">
        &larr; Back
      </button>
      <div className="weather-container">
        <div className="weather-grid">
          <div className="weather-card rainfall">
            <h3>Rainfall</h3>
            <p>{rainfall ? `${rainfall} mm` : "No Rain"}</p>
          </div>

          <div className="weather-card humidity">
            <h3>Humidity</h3>
            <p>{humidity ? `${humidity}%` : "N/A"}</p>
          </div>

          <div className="weather-card temperature">
            <h3>Temperature</h3>
            <p>{temperature ? `${temperature}°C` : "N/A"}</p>
          </div>

          <div className="weather-card date">
            <h3>Today</h3>
            <p>{date}</p>
          </div>
        </div>
      </div>

      <div className="weather-search-row">
        <div className="search-panel">
          <div className="search-input-group">
            <div className="search-input-inSpecial">
              <label htmlFor="city">Enter Your City Name</label>
              <input
                id="city"
                type="text"
                value={cityInput}
                onChange={handleCityChange}
                placeholder="Enter city name"
              />
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <PredictedWeather predictedWeather={predictedWeather} />
        </div>
        <PestRiskIndicator predictedWeather={predictedWeather} />
      </div>

      <div className="weather-forecast-row">
        <div className="weather-chart-panel">
          <WeatherChart forecast={forecast} />
        </div>

        <div className="forecast-list">
          <h2>Weather Forecast</h2>
          {Array.isArray(forecast) && forecast.length > 0 ? (
            <ul>
              {forecast.map((day, index) => (
                <li key={index}>
                  <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                  <p>
                    {day.temp.day}°C - {day.weather[0].description}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading forecast...</p>
          )}
        </div>
        <Chatbot />
      </div>
    </div>
  );
};

export default Weather;