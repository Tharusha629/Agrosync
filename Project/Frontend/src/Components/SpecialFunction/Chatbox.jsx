import React, { useState } from "react";
import { FaRedo } from "react-icons/fa"; 

const HelpMenu = () => {
  const [category, setCategory] = useState("");
  const [crop, setCrop] = useState("");
  const [selection, setSelection] = useState("");
  const [isOpen, setIsOpen] = useState(false); 

  // Function to reset all states (refresh the help menu)
  const handleRefresh = () => {
    setCategory("");
    setCrop("");
    setSelection("");
  };

  const renderCategories = () => (
    <div className="grid grid-cols-2 gap-2 mb-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => setCategory("chemicals")}>Chemicals</button>
      <button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600" onClick={() => setCategory("pests")}>Pests</button>
      <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600" onClick={() => setCategory("diseases")}>Diseases</button>
      <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600" onClick={() => setCategory("irrigation")}>Irrigation</button>
      <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600" onClick={() => setCategory("fertilizers")}>Fertilizers</button>
      <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600" onClick={() => setCategory("weather")}>Weather Advice</button>
      <button className="bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800" onClick={() => setCategory("soil")}>Soil Health</button>
      <button className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600" onClick={() => setCategory("crop")}>Crop Selection</button>
      <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600" onClick={() => setCategory("harvesting")}>Harvesting</button>
      <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600" onClick={() => setCategory("market")}>Market Prices</button>
      <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={() => setCategory("equipment")}>Equipment</button>
      <button className="bg-lime-500 text-white px-4 py-2 rounded-md hover:bg-lime-600" onClick={() => setCategory("organic")}>Organic Farming</button>
    </div>
  );

  const renderCropSelection = () => (
    <div>
      <h3 className="text-lg font-semibold mb-2">Select Crop:</h3>
      <div className="grid grid-cols-2 gap-2">
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={() => setCrop("tomato")}>Tomato</button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600" onClick={() => setCrop("potato")}>Potato</button>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600" onClick={() => setCrop("wheat")}>Wheat</button>
      </div>
    </div>
  );

  const renderProblemSelection = () => (
    <div>
      <h3 className="text-lg font-semibold mb-2">Select Problem:</h3>
      <div className="grid grid-cols-2 gap-2">
        <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600" onClick={() => setSelection("blight")}>Blight</button>
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600" onClick={() => setSelection("aphids")}>Aphids</button>
      </div>
    </div>
  );

  const renderAdvice = () => {
    if (selection === "blight") {
      return <p className="text-green-300">✅ Use Copper Fungicide. Apply every 7 days.</p>;
    } else if (selection === "aphids") {
      return <p className="text-green-300">✅ Use Neem Oil Spray. Apply every 5 days.</p>;
    }
  };

  const renderContent = () => {
    if (!category) {
      return <p className="text-gray-300">Select a category to get help.</p>;
    }

    if (!crop) {
      return renderCropSelection();
    }

    if (!selection) {
      return renderProblemSelection();
    }

    return renderAdvice();
  };

  return (
    <>
      {/* Button to open/close the Help Menu */}
      {!isOpen && (
        <button
          className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600"
          onClick={() => setIsOpen(true)}
        >
          Chat
        </button>
      )}

      {/* Help Menu when open */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 bg-gray-800 text-white p-6 rounded-lg shadow-lg w-80">
          <h3 className="text-xl font-semibold mb-4">Help Menu</h3>
          {renderCategories()}
          <div className="mt-4 p-4 bg-gray-700 rounded-lg">
            {renderContent()}
          </div>
          
          {/* Close Button */}
          <button
            className="absolute top-0 right-2 text-white text-4xl "
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>

          {/* Refresh Icon Button */}
          <button
            className="absolute top-2 right-10 text-white text-xl pt-1 "
            onClick={handleRefresh}
          >
            <FaRedo />
          </button>
        </div>
      )}
    </>
  );
};

export default HelpMenu;
