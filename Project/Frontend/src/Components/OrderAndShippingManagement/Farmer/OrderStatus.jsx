import React, { useEffect, useState } from "react";
import "./order.css";
import axios from "axios";
import NavBar from "../../Home/NavBar";

function OrderStatus() {
  const [order, setOrders] = useState([]);

  useEffect(() => {
    // Fetch all orders from the database
    const fetchOrders = async () => {
      try {
        const userID = localStorage.getItem("UserID"); // Get the userID from local storage
        if (!userID) {
          alert("User not logged in");
          return;
        }

        const response = await axios.get("http://localhost:8081/order");
        if (response.status === 200) {
          const filteredOrders = response.data.order.filter(
            (order) => order.userID === userID
          ); // Filter orders by userID
          setOrders(filteredOrders);
        } else {
          alert("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("An error occurred while fetching orders");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="page_with_set">
        <p className="topic_from">
          My Orders <span className="dot">.</span>
        </p>
        <div className="order_card_continer">
          {order.length === 0 ? (
            <div className="no-orders">
              <p>Not Found Order</p>
            </div>
          ) : (
            order.map((order) => (
              <div className="orders-status-grid" key={order.orderID}>
                <div className="order-status-card">
                  <p className="order-status-title_new">
                    Order : {order.orderID}
                  </p>
                  <div className="order-status-detail-item">
                    <span className="detail-status-label">Service Name:</span>
                    <span className="detail-status-value">
                      {order.serviceName}
                    </span>
                  </div>
                  <div className="order-status-detail-item">
                    <span className="detail-status-label">Service Price:</span>
                    <span className="detail-status-value">
                      ${order.servicePrice}
                    </span>
                  </div>
                  <div className="order-status-detail-item">
                    <span className="detail-status-label">Full Name:</span>
                    <span className="detail-status-value">
                      {order.fullName}
                    </span>
                  </div>
                  <div className="order-status-detail-item">
                    <span className="detail-status-label">Phone:</span>
                    <span className="detail-status-value">{order.phone}</span>
                  </div>
                  <div className="order-status-detail-item">
                    <span className="detail-status-label">Address:</span>
                    <span className="detail-status-value">{order.address}</span>
                  </div>
                  <div className="order-status-detail-item">
                    <span className="detail-status-label">Status:</span>
                    <span className="detail-status-value">{order.status || "Pending"}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderStatus;
