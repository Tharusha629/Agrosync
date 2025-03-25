import React, { useEffect, useState } from "react";
import axios from "axios";
import "./inquiries.css";
import NavBar from "../../Home/NavBar";

function MyInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const userID = localStorage.getItem("UserID");
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get("http://localhost:8081/customer");
        console.log("Response data:", response.data);

        if (response.status === 200) {
          const userInquiries = response.data.inquirie.filter(
            (inquirie) => inquirie.userID === userID
          );
          setInquiries(userInquiries);
        } else {
          alert("Failed to fetch inquiries");
        }
      } catch (error) {
        console.error("Error fetching inquiries:", error);
        alert("An error occurred while fetching inquiries");
      }
    };

    if (userID) {
      fetchInquiries();
    } else {
      alert("User not logged in");
      window.location.href = "/login";
    }
  }, [userID]);

  return (
    <div>
      <NavBar />
      <br />
      <div className="page_with_set">
        <p className="why_chooseus_card_topic">
          My Inquiries <span className="dot">.</span>
        </p>
        <br />
        {inquiries.length === 0 ? (
          <p>No inquiries found.</p>
        ) : (
          <div className="inqry_card_continer">
            {inquiries.map((inquiry) => (
              <div className="inq_card_sub" key={inquiry._id}>
                <h3 className="inq_iddd">{inquiry.inquirieID}</h3>
                <p className="sub_card_subjet"> {inquiry.subject}</p>
                <p className="message_card" style={{ whiteSpace: "pre-line" }}>{inquiry.inquirieMsg}</p>
                <p className="rep_card" style={{ whiteSpace: "pre-line" }}>
                  {inquiry.reply || "No Reply"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyInquiries;
