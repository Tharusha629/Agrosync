
export const predictNextWeekWeather = (data) => {
    if (!Array.isArray(data) || data.length === 0) return { predictedWeather: [], pestRisk: "Low" };
  
    let predictedWeather = [];
    let highHumidityDays = 0;
    let rainyDays = 0;
  
    for (let i = 0; i < 7; i++) {

      // Last known weather data
      const lastDay = data[data.length - 1]; 
      const avgTemp =
        data.slice(-7).reduce((sum, day) => sum + day.temp.day, 0) / 7;
  
      let predictedTemp = avgTemp + (Math.random() * 2 - 1); 
      let predictedHumidity = lastDay.humidity + (Math.random() * 5 - 2);
      let predictedCondition = "Clear Sky";
  
      if (predictedHumidity > 80) {
        predictedCondition = "Rainy";
        rainyDays++;
      } else if (predictedTemp > 30) {
        predictedCondition = "Hot";
      }
  
      if (predictedHumidity > 75) highHumidityDays++;
  
      predictedWeather.push({
        date: new Date(lastDay.dt * 1000 + (i + 1) * 86400000), 
        temp: predictedTemp.toFixed(1),
        humidity: predictedHumidity.toFixed(1),
        condition: predictedCondition,
      });
    }
  
    let pestRisk = "Low";
    if (highHumidityDays >= 5 || rainyDays >= 3) {
      pestRisk = "High";
    } else if (highHumidityDays >= 3) {
      pestRisk = "Medium";
    }
  
    return  {predictedWeather  , pestRisk};
  };
  