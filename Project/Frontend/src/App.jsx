import React from "react";
import { Route, Routes } from "react-router";
//Home component
import Home from "./Components/Home/Home";
//User Management Routes
//-----Admin
import AddFarmer from "./Components/UserManagement/Admin/AddFarmer";
import AdminLogin from "./Components/UserManagement/Admin/AdminLogin";
import AllFarmers from "./Components/UserManagement/Admin/AllFarmers";
import UpdateFarmer from "./Components/UserManagement/Admin/UpdateFarmer";
//-----Farmer
import Login from "./Components/UserManagement/Farmer/Login";
import Payment from "./Components/UserManagement/Farmer/Payment";
import PaymentReceipt from "./Components/UserManagement/Farmer/PaymentReceipt";
import Profile from "./Components/UserManagement/Farmer/Profile";
import Register from "./Components/UserManagement/Farmer/Register";
import UpdateProfile from "./Components/UserManagement/Farmer/UpdateProfile";

//Service Management
//-----Admin
import AddServicess from "./Components/ServicesManagement/Admin/AddServicess";
import AllServicess from "./Components/ServicesManagement/Admin/AllServicess";
import UpdateServicess from "./Components/ServicesManagement/Admin/UpdateServicess";
//-----Farmer
import ServiceList from "./Components/ServicesManagement/Farmer/ServicessList";

//Order and shipping Management
//-----Admin
import AllOrders from "./Components/OrderAndShippingManagement/Admin/AllOrders";
import UpdateOrderStatus from "./Components/OrderAndShippingManagement/Admin/UpdateOrderStatus";
//-----Farmer
import AddOrder from "./Components/OrderAndShippingManagement/Farmer/AddOrder";
import OrderStatus from "./Components/OrderAndShippingManagement/Farmer/OrderStatus";
import ShippingLabel from "./Components/OrderAndShippingManagement/Farmer/ShippingLabel";

//Customer Service Management
//-----Admin
import AllInquiries from "./Components/CustomerServiceManagement/Admin/AllInquiries";
import ReplyInquiries from "./Components/CustomerServiceManagement/Admin/ReplyInquiries";
//-----Farmer
import AddInquiries from "./Components/CustomerServiceManagement/Farmer/AddInquiries";
import MyInquiries from "./Components/CustomerServiceManagement/Farmer/MyInquiries";
import Weather from "./Components/SpecialFunction/Weather";

function App() {
  return (
    <>
      <React.Fragment>
        <Routes>
          <Route path="/home" element={<Home />} />
          {/* User Management */}
          {/* Admin */}
          <Route path="/addFarmer" element={<AddFarmer />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/allFarmers" element={<AllFarmers />} />
          <Route path="/updateFarmer/:id" element={<UpdateFarmer />} />
          {/* Farmer */}
          <Route path="/" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/paymentReceipt" element={<PaymentReceipt />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/updateProfile/:id" element={<UpdateProfile />} />

          {/* Services Management */}
          {/* Admin */}
          <Route path="/addservice" element={<AddServicess />} />
          <Route path="/allServicess" element={<AllServicess />} />
          <Route path="/updateServices/:id" element={<UpdateServicess />} />
          {/* Farmer */}
          <Route path="/serviceList" element={<ServiceList />} />

          {/* Order and shipping management */}
          {/* Admin */}
          <Route path="/allOrders" element={<AllOrders />} />
          <Route
            path="/updateOrderStatus/:id"
            element={<UpdateOrderStatus />}
          />
          {/* Farmer */}
          <Route path="/addOrder" element={<AddOrder />} />
          <Route path="/orderStatus" element={<OrderStatus />} />
          <Route path="/shippingLabel" element={<ShippingLabel />} />

          {/* Customer Service Management */}
          {/* Admin */}
          <Route path="/allInquiries" element={<AllInquiries />} />
          <Route path="/replyInquiries/:id" element={<ReplyInquiries />} />
          {/* Farmer */}
          <Route path="/addInquiries" element={<AddInquiries />} />
          <Route path="/myInquiries" element={<MyInquiries />} />

          {/* SpecialFunction */}
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </React.Fragment>
    </>
  );
}

export default App;
