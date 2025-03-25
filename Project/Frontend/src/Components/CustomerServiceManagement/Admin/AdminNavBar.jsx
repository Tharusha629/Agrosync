import React from "react";
import { RiLogoutBoxRFill } from "react-icons/ri";
function AdminNavBar() {
  // Get the current path
  const currentPath = window.location.pathname;

  return (
    <div>
      <div className="nav_continer">
        <div className="page_with_set">
          <div className="nav_full_continer">
            <p className="nav_item">Admin Dashboard</p>
            <div className="nav_item_con">
              <p
                className={`nav_item ${
                  currentPath === "/allFarmers" ? "nav_item_active" : ""
                }`}
                onClick={() => (window.location.href = "/allFarmers")}
              >
                farmers
              </p>
              <p
                className={`nav_item ${
                  currentPath === "/allServicess" ? "nav_item_active" : ""
                }`}
                onClick={() => (window.location.href = "/allServicess")}
              >
                Services
              </p>
              <p
                className={`nav_item ${
                  currentPath === "/allOrders" ? "nav_item_active" : ""
                }`}
                onClick={() => (window.location.href = "/allOrders")}
              >
                order
              </p>
              <p
                className={`nav_item ${
                  currentPath === "/allInquiries" ? "nav_item_active" : ""
                }`}
                onClick={() => (window.location.href = "/allInquiries")}
              >
                Inquiry
              </p>
              <RiLogoutBoxRFill
                className={`nav_item_icon ${
                  currentPath === "/inquiry" ? "nav_item_icon_active" : ""
                }`}
                onClick={() => (window.location.href = "/adminLogin")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNavBar;
