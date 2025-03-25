
// Showing predicted weather as components uisng map function
// Data has getting by the Weather Api endpoint
const PredictedWeather = ({ predictedWeather }) => (
    <div className="bg-[#304020] w-full h-full rounded-lg p-2 shadow-md overflow-auto">
      <h2 className="text-lg font-semibold pt-2 text-center">
        Predicted Weather
      </h2>
      {Array.isArray(predictedWeather) && predictedWeather.length > 0 ? (
        <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {predictedWeather.map((day, index) => (
            <div
              key={index}
              className="bg-[#405530] p-4 rounded-lg shadow-md"
            >
              <p className="font-semibold text-center">
                {new Date(day.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-center">{day.temp}°C</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Loading predictions...</p>
      )}
    </div>
  );
  
  export default PredictedWeather;
  