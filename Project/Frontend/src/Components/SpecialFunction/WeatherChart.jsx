import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import './WeatherChart.css'; 

const WeatherChart = ({ forecast }) => {
  if (!Array.isArray(forecast) || forecast.length === 0) {
    return <p>Loading chart...</p>;
  }

  // Prepare data for chart
  const chartData = forecast.map((day) => ({
    date: new Date(day.dt * 1000).toLocaleDateString(),
    temperature: day.temp.day, 
    humidity: day.humidity, 
    windSpeed: day.speed, 
  }));

  return (
    <div className="weather-chart-container">
      <h2 className="weather-chart-title">Next 7-Day Weather Forecast</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Temperature Line */}
          <Line type="monotone" dataKey="temperature" stroke="#FF5733" strokeWidth={2} name="Temperature (°C)" />

          {/* Humidity Line */}
          <Line type="monotone" dataKey="humidity" stroke="#33B5E5" strokeWidth={2} name="Humidity (%)" />

          {/* Wind Speed Line */}
          <Line type="monotone" dataKey="windSpeed" stroke="#4CAF50" strokeWidth={2} name="Wind Speed (m/s)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;
