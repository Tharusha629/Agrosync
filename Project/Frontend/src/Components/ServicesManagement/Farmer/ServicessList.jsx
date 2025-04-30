import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../Home/NavBar";

function ServicessList() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:8085/service");
        if (response.status === 200) {
          setServices(response.data.service);
        } else {
          alert("Failed to fetch services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        alert("An error occurred while fetching services");
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.serviceSet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <NavBar />
      <p className="topic_from">
      Services We Offer <span className="dot">.</span>
      </p>
      <div className="page_with_set">
        <div className="admin_action_continer">
          <p></p>
          <input
            type="text"
            placeholder="Search here.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search_bar"
          />
        </div>
        <div className="service_card_continer">
          {filteredServices.map((service) => (
            <div key={service._id} className="service_card">
              <p className="service_card_title">
                {service.title}
                <span className="sub_dot"> .</span>
              </p>
              <p
                className="service_card_dis"
                style={{ whiteSpace: "pre-line" }}
              >
                {" "}
                {service.description}
              </p>
              <div>
                <p className="feature_name">Features</p>
                <ul className="feature_point">
                  {service.serviceSet.split("\n").map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </div>
              <div className="lst_actions">
                <p className="service_card_pric">${service.price}</p>
                <button
                  className="book_btn"
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
      </div>
    </div>
  );
}

export default ServicessList;
