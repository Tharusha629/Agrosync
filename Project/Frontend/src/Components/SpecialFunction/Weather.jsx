/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { predictNextWeekWeather } from "../../utils/weatherPrediction";
import PestRiskIndicator from "./PestRiskIndicator";
import WeatherChart from "./WeatherChart";
import PredictedWeather from "./PredictedWeather";
import Chatbot from "./Chatbox"

const Weather = () => {
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


    //Put your Weather Api in here 
    const ApiKey = "1422877730cd89a17ff7564aabe8a13d";
    const apiWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&cnt=7&units=metric&appid=${ApiKey}`;
    const apiForecast = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=7&units=metric&appid=${ApiKey}`;

    try {
      const ForcatResponse = await axios.get(apiForecast);
      const ForcastData = ForcatResponse.data;

      const WeatherResponse = await axios.get(apiWeather);
      const WeatherData = WeatherResponse.data;

      console.log(WeatherData.main);

      setCity(ForcastData.city.name);
      setForecast(ForcastData.list);
      setHumidity(WeatherData.main.humidity);
      setTemperature(WeatherData.main.temp)
      setRainfall(WeatherData.rain ? WeatherData.rain["1h"] : 0);

      // Predict the next 7 days
      const { predictedWeather } = predictNextWeekWeather(ForcastData.list);
      setPredictedWeather(predictedWeather || []);

      console.log(predictedWeather);

      // Set today's date
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

  return (
    <div className="min-h-screen bg-[#cfc8c8] p-10">
      <div className="container mx-auto p-6">
        {/* Flex Container for Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Rainfall Card */}
          <div className="bg-[#E5E6E8] p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
            <h3 className="text-2xl font-semibold text-center text-[#2A2A2A] mb-3">
              Rainfall
            </h3>
            <p className="text-3xl font-bold text-center text-[#304020]">
              {rainfall ? `${rainfall} mm` : "No Rain"}
            </p>
          </div>

          {/* Humidity Card */}
          <div className="bg-[#FCF1D6] p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
            <h3 className="text-2xl font-semibold text-center text-[#2A2A2A] mb-3">
              Humidity
            </h3>
            <p className="text-3xl font-bold text-center text-[#405530]">
              {humidity ? `${humidity}%` : "N/A"}
            </p>
          </div>

          {/* Temperature Card */}
          <div className="bg-blue-200 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
            <h3 className="text-2xl font-semibold text-center text-[#2A2A2A] mb-3">
            Temperature
            </h3>
            <p className="text-3xl font-bold text-center text-[#405530]">
              {temperature ? `${temperature}°C` : "N/A"}
            </p>
          </div>

          {/* Today's Date Card */}
          <div className="bg-[#F7F7F9] p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
            <h3 className="text-2xl font-semibold text-center text-[#2A2A2A] mb-3">
              Today
            </h3>
            <p className="text-3xl font-bold text-center text-[#6C6C6C]">
              {date}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-row gap-4 p-4 text-center">
        <div className="bg-[#202B12] w-full h-68 rounded-lg p-4 shadow-lg text-white flex gap-4">
          <div className="div flex flex-col">
            {/* Label and Input for City Name */}
            <div className="w-full max-w-md">
              <label
                htmlFor="city"
                className="p-2 block text-lg font-semibold text-white-700 mb-4"
              >
                Enter Your City Name
              </label>
              <input
                id="city"
                type="text"
                value={cityInput}
                onChange={handleCityChange}
                placeholder="Enter city name"
                className="p-4 border rounded-md w-full bg-gray-200 text-black placeholder-gray-500"
              />
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="p-4 bg-blue-500 text-white text-xl rounded-md mt-6 hover:bg-blue-600 transition-colors"
            >
              Search
            </button>
          </div>

          <PredictedWeather predictedWeather={predictedWeather} />
        </div>

        {/* Send predicted weather data into Pest rist as props  */}
        <PestRiskIndicator predictedWeather={predictedWeather} />
      </div>

      <div className="container mx-auto flex flex-row gap-4 p-4 text-center">
        <div className="bg-[#202B12] w-3/4 h-76 rounded-lg p-4 shadow-lg">
          {/* Charts */}
          <WeatherChart forecast={forecast} />
        </div>

        {/* Forecast ChatBot Section */}
        <div className="bg-cyan-400 w-1/4 h-76 rounded-lg p-4 shadow-md overflow-auto">
          <h2 className="text-lg font-semibold mb-2 text-center">
            Weather Forecast
          </h2>
          {Array.isArray(forecast) && forecast.length > 0 ? (
            <ul className="space-y-2">
              {forecast.map((day, index) => (
                <li
                  key={index}
                  className="bg-cyan-500 p-2 rounded-lg shadow-md"
                >
                  <p className="font-semibold">
                    {new Date(day.dt * 1000).toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    {day.temp.day}°C - {day.weather[0].description}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">Loading forecast...</p>
          )}
        </div>
        <Chatbot />
      </div>
    </div>
  );
};

export default Weather;
