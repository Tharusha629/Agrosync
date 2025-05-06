import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../Home/NavBar";
import "./servicessList.css";
import { FiSearch, FiArrowRight } from "react-icons/fi";

function ServicessList() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:8085/service");
        if (response.status === 200) {
          setServices(response.data.service);
          setFilteredServices(response.data.service);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const results = services.filter(
      (service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.serviceSet.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(results);
  }, [searchTerm, services]);

  return (
    <div className="services-page">
      <NavBar />
      <div className="services-header">
        <h1 className="services-title">
          Services We Offer <span className="title-dot">.</span>
        </h1>
        <p className="services-subtitle">Professional solutions for your agricultural needs</p>
      </div>

      <div className="services-container">
        <div className="search-container">
          <div className="search-input-wrapper">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="loading-spinner">Loading services...</div>
        ) : filteredServices.length === 0 ? (
          <div className="no-results">
            <p>No services found matching your search.</p>
          </div>
        ) : (
          <div className="services-grid">
            {filteredServices.map((service) => (
              <div key={service._id} className="service-card">
                <div className="card-content">
                  <h3 className="service-title">
                    {service.title}
                    <span className="title-dot">.</span>
                  </h3>
                  <p className="service-description">{service.description}</p>
                  
                  <div className="features-section">
                    <h4 className="features-title">Features</h4>
                    <ul className="features-list">
                      {service.serviceSet.split("\n").map((line, index) => (
                        <li key={index} className="feature-item">
                          <FiArrowRight className="feature-icon" />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="price">${service.price}</div>
                  <button
                    className="book-button"
                    onClick={() => {
                      localStorage.setItem("UserServicePrice", service.price);
                      localStorage.setItem("UserServiceName", service.title);
                      window.location.href = "/addOrder";
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ServicessList;