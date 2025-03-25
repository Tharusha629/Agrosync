const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./Database/db.js");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');
const app = express();

// Import Routes
const UserRoutes = require("./Routes/UserManagement/UserManagementRoute.js");
const ServiceRoutes = require("./Routes/ServicesManagement/ServiceManagementRoute.js");
const CustomerRoutes = require("./Routes/CustomerServiceManagement/CustomerServiceManagementRoute.js");
const OrderRoutes = require("./routes/OrderAndShippingManagement/OrderAndShippingManagementRoute.js");

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

// Use Routes
app.use('/user', UserRoutes);
app.use('/service', ServiceRoutes);
app.use('/customer', CustomerRoutes);
app.use('/order', OrderRoutes);

const PORT = process.env.PORT || 8085;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
}); 