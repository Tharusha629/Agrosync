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
        const response = await axios.get("http://localhost:8085/order");
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
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });
  
    // Add the company logo
    const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAALuCAYAAADxHZPKAAAACXBIWXMAABYlAAAWJQFJUiTwAAAE32lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI1LTA1LTEzPC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjQ3NTUwN2E0LTkzMmItNDNiZS1hZjY2LTgwMTZlMGM4MDA1MjwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5hZ3Jvc3luayAtIDE8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6dGl0bGU+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnBkZj0naHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyc+CiAgPHBkZjpBdXRob3I+VGhhcnVzaGEgQXBzYWw8L3BkZjpBdXRob3I+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnhtcD0naHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyc+CiAgPHhtcDpDcmVhdG9yVG9vbD5DYW52YSAoUmVuZGVyZXIpIGRvYz1EQUdnVWRPQkhYOCB1c2VyPVVBRGprbi1tazJBIGJyYW5kPUUgU09GVFdBUkVTLi4gdGVtcGxhdGU9R3JlZW4gTWluaW1hbCBBZ3JpY3VsdHVyZSBCdXNpbmVzcyBMb2dvPC94bXA6Q3JlYXRvclRvb2w+CiA8L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0ncic/PjE8sxcAAEqXSURBVHic7NYxDQAwDMCwlT/pQei5RbIR5MwcAADge/M6AAAA2Bl3AAAIMO4AABBg3AEAIMC4AwBAgHEHAIAA4w4AAAHGHQAAAow7AAAEGHcAAAgw7gAAEGDcAQAgwLgDAECAcQcAgADjDgAAAcYdAAACjDsAAAQYdwAACDDuAAAQYNwBACDAuAMAQIBxBwCAAOMOAAABxh0AAAKMOwAABBh3AAAIMO4AABBg3AEAIMC4AwBAgHEHAIAA4w4AAAHGHQAAAow7AAAEGHcAAAgw7gAAEGDcAQAgwLgDAECAcQcAgADjDgAAAcYdAAACjDsAAAQYdwAACDDuAAAQYNwBACDAuAMAQIBxBwCAAOMOAAABxh0AAAKMOwAABBh3AAAIMO4AABBg3AEAIMC4AwBAgHEHAIAA4w4AAAHGHQAAAow7AAAEGHcAAAgw7gAAEGDcAQAgwLgDAECAcQcAgADjDgAAAcYdAAACjDsAAAQYdwAACDDuAAAQYNwBACDAuAMAQIBxBwCAAOMOAAABxh0AAAKMOwAABBh3AAAIMO4AABBg3AEAIMC4AwBAgHEHAIAA4w4AAAHGHQAAAow7AAAEGHcAAAgw7gAAEGDcAQAgwLgDAECAcQcAgADjDgAAAcYdAAACjDsAAAQYdwAACDDuAAAQYNwBACDgAgAA///s1gEJAAAAgKD/r9sR6ArFHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABgIAAP//7NYBCQAAAICg/6/bEegKxR0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAA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BsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABgIAAP//7dYBCQAAAICg/6/bEegKxR0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAbEHQAABsQdAAAGxB0AAAYCtbdsjE327cUAAAAASUVORK5CYII="; // Replace with your Base64 string
    const pageWidth = doc.internal.pageSize.getWidth(); // Get the page width
    const logoWidth = 50; // Set the desired logo width
    const logoHeight = 50; // Set the desired logo height
    const logoX = (pageWidth - logoWidth) / 2; // Center the logo horizontally
    const logoY = 10; // Position the logo at the top (10mm from the top)
  
    try {
      doc.addImage(logoBase64, "PNG", logoX, logoY, logoWidth, logoHeight);
    } catch (error) {
      console.error("Error adding image to PDF:", error);
      alert("Failed to add the logo to the PDF. Please check the Base64 string.");
    }
  
    // Add the report title below the logo
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "bold");
    doc.text("Order Report", pageWidth / 2, logoY + logoHeight + 10, { align: "center" });
  
    // Add the report generation date
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "normal");
    doc.text("Generated on: " + new Date().toLocaleDateString(), pageWidth / 2, logoY + logoHeight + 18, { align: "center" });
  
    // Add a summary section
    const totalOrders = order.length;
    const expiredOrders = order.filter((o) => isOrderExpired(o.createdAt)).length;
    const activeOrders = totalOrders - expiredOrders;
  
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    doc.text(`Total Orders: ${totalOrders}`, 15, logoY + logoHeight + 30);
    doc.text(`Active Orders: ${activeOrders}`, 15, logoY + logoHeight + 35);
    doc.text(`Expired Orders: ${expiredOrders}`, 15, logoY + logoHeight + 40);
  
    // Add the table to the PDF
    doc.autoTable({
      head: [
        [
          "Order ID",
          "Service Name",
          "Service Price ($)",
          "Full Name",
          "Phone",
          "Address",
          "Date",
          "Status",
        ],
      ],
      body: order.map((o) => [
        o.orderID,
        o.serviceName,
        `$${o.servicePrice.toFixed(2)}`,
        o.fullName,
        o.phone,
        o.address,
        formatDate(o.createdAt), // Format the date for the PDF
        isOrderExpired(o.createdAt) ? "Expired" : o.status || "Active",
      ]),
      startY: logoY + logoHeight + 50, // Start the table below the summary
      theme: "grid",
      headStyles: {
        fillColor: [34, 139, 34], // Forest green color for the header
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245], // Light gray for alternate rows
      },
      styles: {
        fontSize: 9,
        cellPadding: 3,
        valign: "middle",
      },
      columnStyles: {
        0: { cellWidth: 25 }, // Order ID
        1: { cellWidth: 40 }, // Service Name
        2: { cellWidth: 25 }, // Service Price
        3: { cellWidth: 30 }, // Full Name
        4: { cellWidth: 30 }, // Phone
        5: { cellWidth: 50 }, // Address
        6: { cellWidth: 25 }, // Date
        7: { cellWidth: 20 }, // Status
      },
    });
  
    // Add footer with page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, 287, { align: "center" });
      doc.text("© 2023 Agrosync. All rights reserved.", pageWidth / 2, 292, { align: "center" });
    }
  
    // Save the PDF
    doc.save("order_report.pdf");
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
