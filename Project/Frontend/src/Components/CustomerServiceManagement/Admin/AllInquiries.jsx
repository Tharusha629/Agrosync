import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AdminNavBar from "./AdminNavBar";

function AllInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all inquiries from the backend
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get("http://localhost:8085/customer");
        if (response.status === 200) {
          setInquiries(response.data.inquirie);
        } else {
          alert("Failed to fetch inquiries");
        }
      } catch (error) {
        console.error("Error fetching inquiries:", error);
        alert("An error occurred while fetching inquiries");
      }
    };

    fetchInquiries();
  }, []);

  // Handle delete inquiry
  const handleDelete = async (id) => {
    // Confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this inquiry?"
    );

    // Proceed only if the user confirms
    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:8085/customer/${id}`
        );
        if (response.status === 200) {
          alert("Inquiry deleted successfully");
          // Remove the deleted inquiry from the state
          setInquiries(inquiries.filter((inquiry) => inquiry._id !== id));
        } else {
          alert("Failed to delete inquiry");
        }
      } catch (error) {
        console.error("Error deleting inquiry:", error);
        alert("An error occurred while deleting inquiry");
      }
    } else {
      // User clicked "Cancel"
      alert("Deletion canceled.");
    }
  };

  const handleUpdate = (id) => {
    window.location.href = `/replyInquiries/${id}`;
  };
  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Inquiries Report", 10, 10);
    doc.autoTable({
      head: [
        ["Inquiry ID", "Full Name", "Email", "Subject", "Message", "Reply"],
      ],
      body: inquiries.map((inquiry) => [
        inquiry.inquirieID,
        inquiry.fullName,
        inquiry.email,
        inquiry.subject,
        inquiry.inquirieMsg,
        inquiry.reply,
      ]),
    });
    doc.save("inquiries_report.pdf");
  };

  // Filter inquiries based on search term
  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.inquirieMsg.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <AdminNavBar />
      <div className="page_with_set">
        <p className="topic_from">
          All Inquiry <span className="dot">.</span>
        </p>
        <div className="admin_action_continer">
          <input
            type="text"
            placeholder="Search by subject or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search_bar"
          />

          <button className="pdf_btn" onClick={generateReport}>
            Generate Report
          </button>
        </div>
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Inquiry ID</th>
              <th>FullName</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Reply</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInquiries.map((inquiry) => (
              <tr key={inquiry._id}>
                <td>{inquiry.inquirieID}</td>
                <td>{inquiry.fullName}</td>
                <td>{inquiry.email}</td>
                <td>{inquiry.subject}</td>
                <td style={{ whiteSpace: "pre-line" }}>
                  {inquiry.inquirieMsg}
                </td>
                <td
                  style={{
                    color: !inquiry.reply ? "red" : "inherit",
                    fontStyle: !inquiry.reply ? "italic" : "normal",
                    whiteSpace: "pre-line",
                  }}
                >
                  {inquiry.reply || "No Reply"}
                </td>
                <td>
                  <button
                    className="btn_action"
                    onClick={() => handleUpdate(inquiry._id)}
                  >
                    Reply
                  </button>
                  <button
                    className="deletbtn"
                    onClick={() => handleDelete(inquiry._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllInquiries;
