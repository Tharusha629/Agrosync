import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";

const helpData = {
  chemicals: {
    crops: {
      tomato: {
        blight: "✅ Use Copper Fungicide. Apply every 7 days.",
      },
    },
  },
  pests: {
    crops: {
      potato: {
        aphids: "✅ Use Neem Oil Spray. Apply every 5 days.",
      },
    },
  },
  diseases: {
    crops: {
      wheat: {
        rust: "✅ Use Sulfur-based fungicide. Avoid overwatering.",
      },
    },
  },
  irrigation: {
    crops: {
      rice: {
        dry: "✅ Increase irrigation. Water twice daily.",
      },
    },
  },
  fertilizers: {
    crops: {
      maize: {
        flowering: "✅ Use NPK fertilizer. Apply 50kg per acre.",
      },
    },
  },
  weather: {
    crops: {
      tomato: {
        rain: "✅ Delay planting until after the rain.",
      },
    },
  },
  soil: {
    crops: {
      wheat: {
        sandy: "✅ Add compost to improve water retention.",
      },
    },
  },
  crop: {
    crops: {
      dry_area: {
        crops: "✅ Recommended crops: Millet, Sorghum.",
      },
    },
  },
  harvesting: {
    crops: {
      tomato: {
        Tips: "✅ Harvest when fruits are firm and fully colored.",
      },
    },
  },
  market: {
    crops: {
      potato: {
        Information: "✅ Current price: $0.50/kg. Prices expected to rise next month.",
      },
    },
  },
  equipment: {
    crops: {
      tractor: {
        Tips: "✅ Check oil levels weekly. Clean air filters regularly.",
      },
    },
  },
  organic: {
    crops: {
      tomato: {
        Tips: "✅ Use neem oil for pest control. Add compost to improve soil.",
      },
    },
  },
};

const categoryColors = {
  chemicals: "bg-blue-500 hover:bg-blue-600",
  pests: "bg-teal-500 hover:bg-teal-600",
  diseases: "bg-green-500 hover:bg-green-600",
  irrigation: "bg-purple-500 hover:bg-purple-600",
  fertilizers: "bg-yellow-500 hover:bg-yellow-600",
  weather: "bg-orange-500 hover:bg-orange-600",
  soil: "bg-amber-700 hover:bg-amber-800",
  crop: "bg-cyan-500 hover:bg-cyan-600",
  harvesting: "bg-pink-500 hover:bg-pink-600",
  market: "bg-indigo-500 hover:bg-indigo-600",
  equipment: "bg-red-500 hover:bg-red-600",
  organic: "bg-lime-500 hover:bg-lime-600",
};

const HelpMenu = () => {
  const [category, setCategory] = useState("");
  const [crop, setCrop] = useState("");
  const [problem, setProblem] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleRefresh = () => {
    setCategory("");
    setCrop("");
    setProblem("");
  };

  const renderCategories = () => (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {Object.keys(helpData).map((cat) => (
        <button
          key={cat}
          className={`${categoryColors[cat] || "bg-gray-500 hover:bg-gray-600"} text-white px-4 py-2 rounded-md capitalize`}
          onClick={() => {
            setCategory(cat);
            setCrop("");
            setProblem("");
          }}
        >
          {cat.replace(/^\w/, (c) => c.toUpperCase())}
        </button>
      ))}
    </div>
  );

  const renderCropSelection = () => {
    const cropKeys = Object.keys(helpData[category]?.crops || {});
    return (
      <div>
        <h3 className="text-lg font-semibold mb-2">Select Crop:</h3>
        <div className="flex flex-wrap gap-2 justify-center items-center">
          {cropKeys.map((cropKey) => (
            <button
              key={cropKey}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 capitalize"
              onClick={() => setCrop(cropKey)}
            >
              {cropKey}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderProblemSelection = () => {
    const problemKeys = Object.keys(helpData[category]?.crops[crop] || {});
    if (problemKeys.length === 1 && problemKeys[0] === "default") {
      setProblem("default");
      return null;
    }

    return (
      <div>
        <h3 className="text-lg font-semibold mb-2">Select Problem:</h3>
        <div className="flex flex-wrap gap-2 justify-center items-center">
          {problemKeys.map((problemKey) => (
            <button
              key={problemKey}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 capitalize"
              onClick={() => setProblem(problemKey)}
            >
              {problemKey}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderAdvice = () => {
    const advice = helpData[category]?.crops[crop]?.[problem];
    return advice ? (
      <p className="text-green-300 mt-4">{advice}</p>
    ) : (
      <p className="text-yellow-300 mt-4">⚠ No advice found.</p>
    );
  };

  const renderContent = () => {
    if (!category) {
      return <p className="text-gray-300">Select a category to get help.</p>;
    }

    if (!crop) {
      return renderCropSelection();
    }

    if (!problem && !helpData[category]?.crops[crop]?.default) {
      return renderProblemSelection();
    }

    return renderAdvice();
  };

  return (
    <>
      {!isOpen && (
        <button
          className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600"
          onClick={() => setIsOpen(true)}
        >
          Chat
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-5 right-5 bg-gray-800 text-white p-6 rounded-lg shadow-lg w-80 z-50">
          <h3 className="text-xl font-semibold mb-4">Help Menu</h3>
          {renderCategories()}
          <div className="mt-4 p-4 bg-gray-700 rounded-lg">{renderContent()}</div>

          <button
            className="absolute top-0 right-2 text-white text-4xl"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
          <button
            className="absolute top-2 right-10 text-white text-xl pt-1"
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
