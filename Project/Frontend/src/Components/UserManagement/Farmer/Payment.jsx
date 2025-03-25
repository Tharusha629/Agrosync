import React, { useState, useEffect } from "react";
import "./payment.css";
import { PayPalButtons } from "@paypal/react-paypal-js";
function Payment() {
  // State to manage the inputs
  const [inputs, setInputs] = useState({
    serviceName: "",
    servicePrice: "",
  });



  useEffect(() => {
    // Fetch data from localStorage
    const serviceName = localStorage.getItem("UserServiceName");
    const servicePrice = localStorage.getItem("UserServicePrice");

    // Update the inputs state with the fetched data
    setInputs((prevInputs) => ({
      ...prevInputs,
      serviceName: serviceName || "",
      servicePrice: servicePrice || "",
    }));
  }, []);

  return (
    <div className="page_with_set">
      <div className="payment_continer">
        <div className="paypal_payment_continer">
          <p className="pay_card_topic">Pay Here..</p>
          <div className="fech_data_con">
            <p className="fech_data_con_name">{inputs.serviceName}</p>
            <p className="fech_data_con_name">{inputs.servicePrice}</p>
          </div>
          <div className="card_data_add_continer">
            <PayPalButtons
              className="paypalbtn"
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: inputs.servicePrice,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(function (details) {
                  alert(
                    "Transaction completed by " + details.payer.name.given_name
                  );
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
