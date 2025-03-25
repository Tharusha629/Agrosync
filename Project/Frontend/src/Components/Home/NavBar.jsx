import React from "react";
import Logo from "./img/logo.png";
import { RiAccountCircleFill } from "react-icons/ri";
import { RiLogoutBoxRFill } from "react-icons/ri";
function NavBar() {
  // Get the current path
  const currentPath = window.location.pathname;

  return (
    <div>
      <div className="nav_continer">
        <div className="page_with_set">
          <div className="nav_full_continer">
            <img src={Logo} alt="logo" className="nav_logo" />
            <div className="nav_item_con">
              <p
                className={`nav_item ${currentPath === "/home" ? "nav_item_active" : ""
                  }`}
                onClick={() => (window.location.href = "/home")}
              >
                Home
              </p>
              <p
                className={`nav_item ${currentPath === "/serviceList" ? "nav_item_active" : ""
                  }`}
                onClick={() => (window.location.href = "/serviceList")}
              >
                Services
              </p>
              <p
                className={`nav_item ${currentPath === "/addInquiries" ? "nav_item_active" : ""
                  }`}
                onClick={() => (window.location.href = "/addInquiries")}
              >
                Inquiry
              </p>
              <p
                className="nav_item"
                onClick={() => (window.location.href = "http://localhost:5176/")}
              >
                Special
              </p>

              <RiAccountCircleFill
                className={`nav_item_icon ${currentPath === "/profile" ? "nav_item_icon_active" : ""
                  }`}
                onClick={() => (window.location.href = "/profile")}
              />
              <RiLogoutBoxRFill
                className={`nav_item_icon ${currentPath === "/" ? "nav_item_icon_active" : ""
                  }`}
                onClick={() => (window.location.href = "/")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
