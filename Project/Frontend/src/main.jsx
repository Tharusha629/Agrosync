import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// Create the root element for the React app
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <PayPalScriptProvider options={{ "client-id": "ASTqKkNp785I82qiM_PoOs_9YPUtV6-ZwRLt4sIOD8veVRcMDhEAh-Zk4xiy0ruxB5HetBqkQPLa3fzm" }}>
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
  </PayPalScriptProvider>,
);