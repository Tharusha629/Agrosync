import React, { useEffect, useState } from "react";
import "./order.css";
import NavBar from "../../Home/NavBar";
import html2canvas from "html2canvas";
import { FaFileDownload } from "react-icons/fa";
import { BsCreditCard2Front } from "react-icons/bs";

function ShippingLabel() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders"));
    if (Array.isArray(orders) && orders.length > 0) {
      setOrder(orders[0]);
    }
  }, []);

  const handleDownloadInvoice = () => {
    const section = document.querySelector(".order-status-container_sub");
    html2canvas(section).then((canvas) => {
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
    return (
      <div>
        <NavBar />
        <div className="no-order">
          <h2>No order found</h2>
          <p>Please place an order first.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="order-wrapper">
        <div className="order-status-container">
          <div className="order-status-container_sub">
            <h1 className="order-status-title">Invoice Summary</h1>
            <div className="order-details">
              {[
                { label: "Order ID", value: order.orderID },
                { label: "Service Name", value: order.serviceName },
                { label: "Service Price", value: `$${order.servicePrice}` },
                { label: "Full Name", value: order.fullName },
                { label: "Phone", value: order.phone },
                { label: "Address", value: order.address },
              ].map((item, index) => (
                <div className="order-detail-item" key={index}>
                  <span className="detail-label">{item.label}:</span>
                  <span className="detail-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="btn_continer">
            <button className="download-btn" onClick={handleDownloadInvoice}>
              <FaFileDownload className="btn-icon" />
              Download Invoice
            </button>
            <button
              className="download-btn proceed-btn"
              onClick={() => (window.location.href = "/payment")}
            >
              <BsCreditCard2Front className="btn-icon" />
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingLabel;
