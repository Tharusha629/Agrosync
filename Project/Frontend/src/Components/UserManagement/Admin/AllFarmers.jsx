import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { applyPlugin } from "jspdf-autotable";
import AdminNavBar from "../../CustomerServiceManagement/Admin/AdminNavBar";
applyPlugin(jsPDF);

function AllFarmers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8085/user");
        const data = await response.json();
        if (response.ok) {
          setUsers(data.user); // Assuming the response contains a `user` array
          setFilteredUsers(data.user); // Initialize filtered users with all users
        } else {
          alert(data.message || "Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("An error occurred while fetching users");
      }
    };

    fetchUsers();
  }, []);

  // Handle search input change
  useEffect(() => {
    const results = users.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  // Handle delete user
  const handleDelete = async (userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8085/user/${userId}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (response.ok) {
          alert("User deleted successfully");
          setUsers(users.filter((user) => user._id !== userId));
          setFilteredUsers(filteredUsers.filter((user) => user._id !== userId));
        } else {
          alert(data.message || "Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting user");
      }
    }
  };

  const handleUpdate = (userId) => {
    window.location.href = `/updateFarmer/${userId}`;
  };

  // Generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Farmers Report", 14, 22);

    // Add table
    doc.autoTable({
      startY: 30,
      head: [["Full Name", "Email", "Phone", "Address"]],
      body: filteredUsers.map((user) => [
        user.fullName,
        user.email,
        user.phone,
        user.address,
      ]),
    });

    // Save the PDF
    doc.save("farmers_report.pdf");
  };

  return (
    <div>
      <AdminNavBar/>
      <div className="page_with_set">
        <p className="topic_from">
          All Farmers <span className="dot">.</span>
        </p>
        <div className="admin_action_continer">
          <button
            className="pdf_btn"
            onClick={() => (window.location.href = "/addFarmer")}
          >
            Add Farmer
          </button>
          <input
            className="search_bar"
            type="text"
            placeholder="Search by name, email, phone, or address"
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
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td className="btn_td_new">
                  <button
                    className="btn_action"
                    onClick={() => handleUpdate(user._id)}
                  >
                    Update
                  </button>
                  <button
                    className="deletbtn"
                    onClick={() => handleDelete(user._id)}
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

export default AllFarmers;
