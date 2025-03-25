import React, { useEffect, useState } from "react";
import "./order.css";
import NavBar from "../../Home/NavBar";
import html2canvas from "html2canvas";
function ShippingLabel() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Fetch the latest order from localStorage
    const orders = JSON.parse(localStorage.getItem("orders"));
    if (orders && orders.length > 0) {
      setOrder(orders[0]); // Set the latest order
    }
  }, []);
  const handleDownloadInvoice = () => {
    const orderDetailsSection = document.querySelector(
      ".order-status-container_sub"
    );
    html2canvas(orderDetailsSection).then((canvas) => {
      const image = canvas.toDataURL("image/jpeg", 1.0);
      const link = document.createElement("a");
      link.href = image;
      link.download = `invoice_${order.orderID}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };
  if (!order) {
    return <div className="no-order">No order found.</div>;
  }

  return (
    <div>
      <div className="order-status-container">
        <div className="order-status-container_sub">
          <h1 className="order-status-title">Invoice</h1>
          <div className="order-details">
            <div className="order-detail-item">
              <span className="detail-label">Order ID:</span>
              <span className="detail-value">{order.orderID}</span>
            </div>
            <div className="order-detail-item">
              <span className="detail-label">Service Name:</span>
              <span className="detail-value">{order.serviceName}</span>
            </div>
            <div className="order-detail-item">
              <span className="detail-label">Service Price:</span>
              <span className="detail-value">${order.servicePrice}</span>
            </div>
            <div className="order-detail-item">
              <span className="detail-label">Full Name:</span>
              <span className="detail-value">{order.fullName}</span>
            </div>
            <div className="order-detail-item">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{order.phone}</span>
            </div>
            <div className="order-detail-item">
              <span className="detail-label">Address:</span>
              <span className="detail-value">{order.address}</span>
            </div>
          </div>
        </div>
        <div className="btn_continer">
          <button className="download-btn" onClick={handleDownloadInvoice}>
            Download Invoice
          </button>
          <button
            className="download-btn"
            onClick={() => (window.location.href = "/payment")}
          >
            Do Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShippingLabel;
