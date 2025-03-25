import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AdminNavBar from "../../CustomerServiceManagement/Admin/AdminNavBar";

function AllOrders() {
  const [order, setOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get("http://localhost:8081/order");
        if (response.status === 200) {
          setOrder(response.data.order);
        } else {
          alert("Failed to fetch order");
        }
      } catch (error) {
        console.error("Error fetching inquiries:", error);
        alert("An error occurred while fetching inquiries");
      }
    };

    fetchInquiries();
  }, []);

  // Function to check if an order is older than 10 days
  const isOrderExpired = (createdAt) => {
    const currentDate = new Date();
    const orderDate = new Date(createdAt);
    const differenceInTime = currentDate.getTime() - orderDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert milliseconds to days
    return differenceInDays > 10; // Return true if the order is older than 10 days
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Order Report", 10, 10);
    doc.autoTable({
      head: [
        [
          "Order ID",
          "Service Name",
          "Service Price $",
          "Full Name",
          "Phone",
          "Address",
          "Date",
          "Status",
        ],
      ],
      body: order.map((order) => [
        order.orderID,
        order.serviceName,
        order.servicePrice,
        order.fullName,
        order.phone,
        order.address,
        formatDate(order.createdAt), // Format the date for the PDF
        order.status || "Pending",
      ]),
    });
    doc.save("order report.pdf");
  };

  const filtered = order.filter(
    (order) =>
      order.orderID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdate = (id) => {
    window.location.href = `/updateOrderStatus/${id}`;
  };

  // Function to format the date as YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <AdminNavBar />
      <div className="page_with_set">
        <p className="topic_from">
          All Orders <span className="dot">.</span>
        </p>
        <div className="admin_action_continer">
          <input
            type="text"
            placeholder="Search by ID.."
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
              <th>Order ID</th>
              <th>Service Name</th>
              <th>Service Price</th>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Status</th>
              <th>Expired</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order._id}>
                <td>{order.orderID}</td>
                <td>{order.serviceName}</td>
                <td>${order.servicePrice}</td>
                <td>{order.fullName}</td>
                <td>{order.phone}</td>
                <td>{order.address}</td>
                {/* Display formatted date */}
                <td
                  style={{
                    color: !order.status ? "red" : "inherit",
                    fontStyle: !order.status ? "italic" : "normal",
                    whiteSpace: "pre-line",
                  }}
                >
                  {order.status || "Pending"}
                </td>
                <td>
                  {isOrderExpired(order.createdAt) ? "Expired" : "Active"}{" "}
                </td>
                <td>
                  <button
                    className="btn_action"
                    onClick={() => handleUpdate(order._id)}
                    disabled={isOrderExpired(order.createdAt)} // Disable button if order is expired
                  >
                    Status
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

export default AllOrders;
