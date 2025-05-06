import React, { useState, useEffect } from "react";
import "./payment.css";
import { PayPalButtons } from "@paypal/react-paypal-js";

function Payment() {
  const [inputs, setInputs] = useState({
    serviceName: "",
    servicePrice: "",
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const serviceName = localStorage.getItem("UserServiceName");
    const servicePrice = localStorage.getItem("UserServicePrice");

    setInputs((prevInputs) => ({
      ...prevInputs,
      serviceName: serviceName || "",
      servicePrice: servicePrice || "",
    }));
  }, []);

  const formatPrice = (price) => {
    return `$${Number(price).toFixed(2)}`;
  };

  return (
    <div className="page_with_set">
      <div className="payment_continer">
        <div className="paypal_payment_continer">
          <h2 className="pay_card_topic">Secure Payment Gateway</h2>
          
          {!paymentSuccess ? (
            <>
              <div className="payment-summary">
                <div className="summary-header">Payment Summary</div>
                <div className="summary-details">
                  <div className="summary-row">
                    <span className="summary-label">Service:</span>
                    <span className="summary-value">{inputs.serviceName}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Amount:</span>
                    <span className="summary-value highlight">{formatPrice(inputs.servicePrice)}</span>
                  </div>
                </div>
              </div>

              {isLoading && (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p>Processing payment...</p>
                </div>
              )}

              <div className="card_data_add_continer">
                <PayPalButtons
                  className="paypalbtn"
                  createOrder={(data, actions) => {
                    setIsLoading(true);
                    return actions.order.create({
                      purchase_units: [{
                        amount: { value: inputs.servicePrice },
                      }],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      setIsLoading(false);
                      setPaymentSuccess(true);
                      localStorage.setItem("lastPaymentId", details.id);
                    });
                  }}
                  onError={() => {
                    setIsLoading(false);
                    alert("There was an error processing your payment.");
                  }}
                />
              </div>
            </>
          ) : (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Payment Successful! 🎉</h3>
              <p>Thank you for your payment. Your transaction has been completed.</p>
              <button 
                className="back-button"
                onClick={() => window.history.back()}
              >
                Return to Services
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payment;
