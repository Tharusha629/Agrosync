import React from "react";

const calculatePestRisk = (predictedWeather) => {
  if (!Array.isArray(predictedWeather) || predictedWeather.length === 0) return "Low";

  let highHumidityDays = 0;
  let rainyDays = 0;

  predictedWeather.forEach((day) => {
    if (day.humidity > 80) rainyDays++;
    if (day.humidity > 75) highHumidityDays++;
  });

  if (highHumidityDays >= 5 || rainyDays >= 3) {
    return "High";
  } else if (highHumidityDays >= 3) {
    return "Medium";
  }
  return "Low";
};

const PestRiskIndicator = ({ predictedWeather }) => {
  const pestRisk = calculatePestRisk(predictedWeather);

  return (
    <div className="w-full sm:w-2/4 md:w-1/3 lg:w-1/4">
      <div
        className={`p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${getRiskBgColor(
          pestRisk
        )}`}
      >
        <h2 className="text-2xl font-semibold text-white mb-4">Pest Risk Indicator</h2>

        {/* Display the Pest Risk Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg text-white">Pest Risk Level:</span>
          <div
            className={`text-xl font-bold px-3 py-2 rounded-full text-white ${getRiskBadgeColor(pestRisk)}`}
          >
            {pestRisk}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <span className="text-white block mb-2">Risk Level Progress</span>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <span className="text-white text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full">
                Low
              </span>
              <span className="text-white text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full">
                High
              </span>
            </div>
            <div className="flex mb-2">
              <div
                className={`w-full rounded-full ${
                  pestRisk === "High"
                    ? "bg-red-500"
                    : pestRisk === "Medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                <div
                  className={`flex p-0.5 rounded-full ${getProgressColor(pestRisk)}`}
                  style={{
                    width: `${pestRisk === "High" ? 100 : pestRisk === "Medium" ? 60 : 30}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions to handle background and text color based on the risk level
const getRiskBgColor = (riskLevel) => {
  switch (riskLevel) {
    case "High":
      return "bg-red-500"; 
    case "Medium":
      return "bg-yellow-500"; 
    default:
      return "bg-green-500"; 
  }
};

// Helper function to get badge color
const getRiskBadgeColor = (riskLevel) => {
  switch (riskLevel) {
    case "High":
      return "bg-red-700"; 
    case "Medium":
      return "bg-yellow-600"; 
    default:
      return "bg-green-600"; 
  }
};

// Helper function to get progress bar color
const getProgressColor = (riskLevel) => {
  switch (riskLevel) {
    case "High":
      return "bg-red-400"; 
    case "Medium":
      return "bg-yellow-400"; 
    default:
      return "bg-green-400"; 
  }
};

export default PestRiskIndicator;
