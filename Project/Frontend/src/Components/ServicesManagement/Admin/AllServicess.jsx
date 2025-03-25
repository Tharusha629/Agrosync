import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./servicess.css";
import AdminNavBar from "../../CustomerServiceManagement/Admin/AdminNavBar";

function AllServicess() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all services when the component mounts
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:8085/service");
        if (response.status === 200) {
          setServices(response.data.service); // Assuming the response contains a `service` array
        } else {
          alert("Failed to fetch services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        alert("An error occurred while fetching services");
      }
    };

    fetchServices();
  }, []);

  // Filter services based on search term
  const filteredServices = services.filter(
    (service) =>
      service.serviceID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.serviceSet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete service
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:8085/service/${id}`
        );
        if (response.status === 200) {
          alert("Service deleted successfully");
          // Remove the deleted service from the state
          setServices(services.filter((service) => service._id !== id));
        } else {
          alert("Failed to delete service");
        }
      } catch (error) {
        console.error("Error deleting service:", error);
        alert("An error occurred while deleting service");
      }
    }
  };

  // Handle update service (redirect to update page)
  const handleUpdate = (id) => {
    window.location.href = `/updateServices/${id}`;
  };

  // Generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("All Services Report", 14, 22);

    // Add table
    doc.autoTable({
      startY: 30,
      head: [["Service ID", "Title", "Description", "Service Set","Price"]],
      body: filteredServices.map((service) => [
        service.serviceID,
        service.title,
        service.description,
        service.serviceSet,
        service.price,
      ]),
    });

    // Save the PDF
    doc.save("all_services_report.pdf");
  };

  return (
    <div>
      <AdminNavBar/>
      <div className="page_with_set">
        <p className="topic_from">
          All Services <span className="dot">.</span>
        </p>
        <div className="admin_action_continer">
          <button
            className="pdf_btn"
            onClick={() => (window.location.href = "/addservice")}
          >
            Add Service
          </button>
          <input
            className="search_bar"
            type="text"
            placeholder="Search services .."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="pdf_btn" onClick={generatePDF}>
            Generate PDF Report
          </button>
        </div>

        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Service ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Service Set</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((service) => (
              <tr key={service._id}>
                <td>{service.serviceID}</td>
                <td>{service.title}</td>
                <td style={{ whiteSpace: "pre-line" }}>
                  {service.description}
                </td>
                <td style={{ whiteSpace: "pre-line" }}>{service.serviceSet}</td>
                <td style={{ whiteSpace: "pre-line" }}>${service.price}</td>
                <td className="btn_td_new">
                  <button
                    className="btn_action"
                    onClick={() => handleUpdate(service._id)}
                  >
                    Update
                  </button>
                  <button
                    className="deletbtn"
                    onClick={() => handleDelete(service._id)}
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

export default AllServicess;
