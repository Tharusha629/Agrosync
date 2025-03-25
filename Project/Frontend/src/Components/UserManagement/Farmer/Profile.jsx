import React, { useEffect, useState } from "react";
import "./acc.css";
import NavBar from "../../Home/NavBar";
import ProBk from "./img/proBk.png";
import ICardImg from "./img/myi.png";
import OrderImg from "./img/orderr.png";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
function Profile() {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("UserID");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8085/user/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
        } else {
          alert(data.message || "Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("An error occurred while fetching user data");
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      alert("User not logged in");
      window.location.href = "/login";
    }
  }, [userId]);

  const handleDelete = async () => {
    // Ask for confirmation before deleting the account
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    // Proceed only if the user confirms
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8085/user/${userId}`, {
          method: "DELETE",
        });
        const data = await response.json();

        if (response.ok) {
          alert("User deleted successfully");
          localStorage.removeItem("UserID"); // Remove user ID from local storage
          window.location.href = "/"; // Redirect to the home page or login page
        } else {
          alert(data.message || "Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting user");
      }
    } else {
      // User canceled the deletion
      alert("Account deletion canceled.");
    }
  };

  const handleUpdate = () => {
    window.location.href = `/updateProfile/${userId}`;
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="profillecard_back">
        <div className="page_with_set">
          <div className="profile_card">
            <div className="profile_card_colum">
              <p className="profile_card_colum_name hi">Hi,</p>
              <p className="profile_card_colum_name">{user.fullName}</p>
              <br />
              <div className="sb_contend_pro_card">
                <MdEmail className="sb_contend_pro_icon" />
                <p className="sb_contend_pro">{user.email}</p>
              </div>
              <div className="sb_contend_pro_card">
                <FaPhoneAlt className="sb_contend_pro_icon" />
                <p className="sb_contend_pro">{user.phone}</p>
              </div>
              <div className="sb_contend_pro_card">
                <FaLocationDot className="sb_contend_pro_icon" />
                <p className="sb_contend_pro">{user.address}</p>
              </div>
              <div className="btn_continer_pro">
                <div className="updatebtn_con">
                  <GrUpdate className="updatebtn" onClick={handleUpdate} />
                </div>
                <div className="delete_con">
                  <MdDelete className="deletebtn" onClick={handleDelete} />
                </div>
              </div>
            </div>
            <div className="profile_card_colum_img">
              <img src={ProBk} className="profile_icon" alt="img" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="page_with_set">
          <div className="profile_card_foot">
            <div
              className="inq_card"
              onClick={() => (window.location.href = "/myInquiries")}
            >
              <img src={ICardImg} className="inq_card_img" alt="img" />
              <p className="inq_card_btn">My Inquiry</p>
            </div>
            <div
              className="inq_card"
              onClick={() => (window.location.href = "/orderStatus")}
            >
              <img src={OrderImg} className="inq_card_img" alt="img" />
              <p className="inq_card_btn">My Orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
