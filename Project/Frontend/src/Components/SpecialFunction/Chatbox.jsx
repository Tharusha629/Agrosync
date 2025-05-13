import React, { useState, useEffect } from "react";
import { FaRedo, FaRobot, FaTimes, FaChevronDown, FaChevronUp, FaLeaf, FaTractor, FaCloudRain, FaSeedling, FaShoppingBag, FaWater, FaFlask, FaBug, FaTree, FaMoneyBillWave, FaBoxes } from "react-icons/fa";
import "./ChatBot.css";

const helpData = {
  chemicals: {
    icon: <FaFlask />,
    crops: {
      tomato: {
        blight: "✅ Use Copper Fungicide. Apply every 7 days during wet weather conditions.",
      },
    },
  },
  pests: {
    icon: <FaBug />,
    crops: {
      potato: {
        aphids: "✅ Use Neem Oil Spray. Apply every 5 days in the early morning.",
      },
    },
  },
  diseases: {
    icon: <FaLeaf />,
    crops: {
      wheat: {
        rust: "✅ Use Sulfur-based fungicide. Avoid overwatering and ensure proper spacing between plants.",
      },
    },
  },
  irrigation: {
    icon: <FaWater />,
    crops: {
      rice: {
        dry: "✅ Increase irrigation frequency. Water twice daily during dry seasons.",
      },
    },
  },
  fertilizers: {
    icon: <FaSeedling />,
    crops: {
      maize: {
        flowering: "✅ Apply NPK fertilizer (10-20-10) at 50kg per acre during flowering stage.",
      },
    },
  },
  weather: {
    icon: <FaCloudRain />,
    crops: {
      tomato: {
        rain: "✅ Delay planting until after heavy rains. Use raised beds to improve drainage.",
      },
    },
  },
  soil: {
    icon: <FaTree />,
    crops: {
      wheat: {
        sandy: "✅ Add 3-5 tons of compost per acre to improve water retention in sandy soils.",
      },
    },
  },
  crop: {
    icon: <FaSeedling />,
    crops: {
      dry_area: {
        crops: "✅ Recommended drought-resistant crops: Millet (Pennisetum glaucum), Sorghum (Sorghum bicolor), Cowpea (Vigna unguiculata).",
      },
    },
  },
  harvesting: {
    icon: <FaShoppingBag />,
    crops: {
      tomato: {
        Tips: "✅ Harvest when fruits are firm and fully colored. Morning harvest preserves quality. Store at 12-15°C.",
      },
    },
  },
  market: {
    icon: <FaMoneyBillWave />,
    crops: {
      potato: {
        Information: "✅ Current market price: $0.50/kg. Prices expected to rise 15-20% next month due to increased demand.",
      },
    },
  },
  equipment: {
    icon: <FaTractor />,
    crops: {
      tractor: {
        Tips: "✅ Maintenance checklist: Check oil levels weekly, clean air filters regularly, inspect tire pressure monthly.",
      },
    },
  },
  organic: {
    icon: <FaLeaf />,
    crops: {
      tomato: {
        Tips: "✅ Organic solutions: Neem oil (pest control), compost tea (soil amendment), companion planting with basil.",
      },
    },
  },
};

const categoryColors = {
  chemicals: { bg: "bg-blue-500", hover: "hover:bg-blue-600", iconColor: "text-blue-100", border: "border-blue-400" },
  pests: { bg: "bg-teal-500", hover: "hover:bg-teal-600", iconColor: "text-teal-100", border: "border-teal-400" },
  diseases: { bg: "bg-green-600", hover: "hover:bg-green-700", iconColor: "text-green-100", border: "border-green-500" },
  irrigation: { bg: "bg-purple-500", hover: "hover:bg-purple-600", iconColor: "text-purple-100", border: "border-purple-400" },
  fertilizers: { bg: "bg-yellow-500", hover: "hover:bg-yellow-600", iconColor: "text-yellow-100", border: "border-yellow-400" },
  weather: { bg: "bg-orange-500", hover: "hover:bg-orange-600", iconColor: "text-orange-100", border: "border-orange-400" },
  soil: { bg: "bg-amber-700", hover: "hover:bg-amber-800", iconColor: "text-amber-100", border: "border-amber-600" },
  crop: { bg: "bg-cyan-500", hover: "hover:bg-cyan-600", iconColor: "text-cyan-100", border: "border-cyan-400" },
  harvesting: { bg: "bg-pink-500", hover: "hover:bg-pink-600", iconColor: "text-pink-100", border: "border-pink-400" },
  market: { bg: "bg-indigo-500", hover: "hover:bg-indigo-600", iconColor: "text-indigo-100", border: "border-indigo-400" },
  equipment: { bg: "bg-red-500", hover: "hover:bg-red-600", iconColor: "text-red-100", border: "border-red-400" },
  organic: { bg: "bg-lime-500", hover: "hover:bg-lime-600", iconColor: "text-lime-100", border: "border-lime-400" },
};

const ChatBot = () => {
  const [category, setCategory] = useState("");
  const [crop, setCrop] = useState("");
  const [problem, setProblem] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const handleRefresh = () => {
    setIsThinking(true);
    setTimeout(() => {
      setCategory("");
      setCrop("");
      setProblem("");
      setIsThinking(false);
    }, 800);
  };

  const handleSelection = (setter, value) => {
    setIsThinking(true);
    setTimeout(() => {
      setter(value);
      setIsThinking(false);
    }, 600);
  };

  const renderCategories = () => (
    <div className="category-grid">
      {Object.entries(helpData).map(([cat, data]) => (
        <button
          key={cat}
          className={`category-button ${categoryColors[cat].bg} ${categoryColors[cat].hover} ${categoryColors[cat].border}`}
          onClick={() => handleSelection(setCategory, cat)}
        >
          <span className={`category-icon ${categoryColors[cat].iconColor}`}>{data.icon}</span>
          <span className="category-label">{cat.replace(/^\w/, (c) => c.toUpperCase())}</span>
        </button>
      ))}
    </div>
  );

  const renderCropSelection = () => {
    const cropKeys = Object.keys(helpData[category]?.crops || {});
    return (
      <div className="selection-section">
        <h3 className="selection-title">
          <span className={`selection-icon ${categoryColors[category].bg}`}>{helpData[category].icon}</span>
          Select Crop:
        </h3>
        <div className="selection-buttons">
          {cropKeys.map((cropKey) => (
            <button
              key={cropKey}
              className={`selection-button crop-button ${categoryColors[category].bg} ${categoryColors[category].hover}`}
              onClick={() => handleSelection(setCrop, cropKey)}
            >
              {cropKey.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderProblemSelection = () => {
    const problemKeys = Object.keys(helpData[category]?.crops[crop] || {});
    if (problemKeys.length === 1 && problemKeys[0] === "default") {
      handleSelection(setProblem, "default");
      return null;
    }

    return (
      <div className="selection-section">
        <h3 className="selection-title">
          <span className={`selection-icon ${categoryColors[category].bg}`}>{helpData[category].icon}</span>
          Select Problem for {crop.replace(/_/g, ' ')}:
        </h3>
        <div className="selection-buttons">
          {problemKeys.map((problemKey) => (
            <button
              key={problemKey}
              className={`selection-button problem-button ${categoryColors[category].bg} ${categoryColors[category].hover}`}
              onClick={() => handleSelection(setProblem, problemKey)}
            >
              {problemKey.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderAdvice = () => {
    const advice = helpData[category]?.crops[crop]?.[problem];
    return advice ? (
      <div className={`advice-section ${categoryColors[category].border}`}>
        <div className="advice-header">
          <h4 className="advice-title">
            <span className={`advice-icon ${categoryColors[category].bg}`}>{helpData[category].icon}</span>
            Solution for {crop.replace(/_/g, ' ')}
          </h4>
          <span className={`advice-category ${categoryColors[category].bg}`}>{category}</span>
        </div>
        <div className="advice-content">
          <p className="advice-text">{advice}</p>
        </div>
        <div className="advice-footer">
          <span className="advice-tip">💡 Tip: Always follow safety guidelines when applying treatments</span>
        </div>
      </div>
    ) : (
      <p className="no-advice">
        ⚠ No specific advice found for this combination. Try a different selection.
      </p>
    );
  };

  const renderContent = () => {
    if (isThinking) {
      return (
        <div className="thinking-container">
          <div className="thinking-animation">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <p className="thinking-text">Analyzing your request...</p>
        </div>
      );
    }

    if (!category) {
      return (
        <div className="welcome-section">
          <div className="bot-icon">
            <FaRobot size={48} />
          </div>
          <h3 className="welcome-title">Hello Farmer! 👩‍🌾</h3>
          <p className="welcome-text">I'm your Agri Assistant. Select a category to get expert farming advice.</p>
          {renderCategories()}
        </div>
      );
    }

    return (
      <div className="content-section">
        {!crop ? (
          renderCropSelection()
        ) : !problem && !helpData[category]?.crops[crop]?.default ? (
          renderProblemSelection()
        ) : (
          renderAdvice()
        )}
        
        {(crop || problem) && (
          <button 
            className="back-button" 
            onClick={() => {
              if (problem) {
                handleSelection(setProblem, "");
              } else {
                handleSelection(setCrop, "");
              }
            }}
          >
            ← Back to {problem ? "Problems" : "Crops"}
          </button>
        )}
      </div>
    );
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {!isOpen && (
        <button className="chatbot-launch-button" onClick={() => setIsOpen(true)}>
          <div className="launch-button-content">
            <FaRobot className="chatbot-icon" />
            <span>Agri Assistant</span>
          </div>
          <div className="pulse-effect"></div>
          <div className="ripple-effect"></div>
        </button>
      )}

      {isOpen && (
        <div className={`chatbot-container ${isMinimized ? 'minimized' : ''}`}>
          <div className="chatbot-header" onClick={toggleMinimize}>
            <div className="header-content">
              <div className="header-icon-wrapper">
                <FaRobot className="header-icon" />
              </div>
              <div className="header-text">
                <h3>Agri Assistant</h3>
                <p className="header-subtitle">Your farming expert</p>
              </div>
            </div>
            <div className="header-actions">
              <button className="refresh-button" onClick={handleRefresh}>
                <FaRedo />
              </button>
              <button className="minimize-button">
                {isMinimized ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <button className="close-button" onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <div className="chatbot-content">
              {renderContent()}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;