import React from "react";
import "./PestRiskIndicator.css"; 

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
    <div className={`pest-risk-container ${pestRisk.toLowerCase()}`}>
      <div className={`pest-risk-card ${pestRisk.toLowerCase()}`}>
        <h2 className="pest-risk-title">Pest Risk Indicator</h2>

        {/* Display the Pest Risk Badge */}
        <div className="pest-risk-badge">
          <span className="pest-risk-label">Pest Risk Level:</span>
          <div className={`pest-risk-level ${pestRisk.toLowerCase()}`}>
            {pestRisk}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pest-risk-progress">
          <span className="pest-risk-progress-label">Risk Level Progress</span>
          <div className="progress-container">
            <div className="progress-labels">
              <span className="low-label">Low</span>
              <span className="high-label">High</span>
            </div>
            <div className="progress-bar">
              <div className={`progress ${pestRisk.toLowerCase()}`}>
                <div
                  className={`progress-fill ${pestRisk.toLowerCase()}`}
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

export default PestRiskIndicator;
