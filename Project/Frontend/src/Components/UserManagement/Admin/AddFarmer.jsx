// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavBar from "../../CustomerServiceManagement/Admin/AdminNavBar";

function AddFarmer() {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await sendRequest();
  };
  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:8085/user", {
        fullName: inputs.fullName,
        email: inputs.email,
        password: inputs.password,
        phone: inputs.phone,
        address: inputs.address,
      });

      if (response.status === 200) {
        window.alert("Farmer Added successfully!");
        window.location.href = "./allFarmers";
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        window.alert(error.response.data.message);
      } else {
        // Handle other errors
        window.alert("An error occurred while creating the account.");
      }
    }
  };
  return (
    <div>
      <AdminNavBar/>
      <p className="topic_from">
        Add New Farmer <span className="dot">.</span>
      </p>
      <form className="data_form" onSubmit={handleSubmit}>
        <div className="data_form_section">
          <label className="data_from_lable">Full Name</label>
          <input
            className="data_from_input"
            type="text"
            id="fullName"
            name="fullName"
            required
            placeholder="Enter Farmer Full Name"
            value={inputs.fullName}
            onChange={(e) => {
              const re = /^[A-Za-z\s]*$/;
              if (re.test(e.target.value)) {
                handleChange(e);
              }
            }}
          />
        </div>
        <div className="data_form_section">
          <label className="data_from_lable">Email</label>
          <input
            className="data_from_input"
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter Farmer Email"
            value={inputs.email}
            onChange={handleChange}
          />
        </div>
        <div className="data_form_section">
          <label className="data_from_lable">Password</label>
          <input
            className="data_from_input"
            type="password"
            id="password"
            placeholder="Enter Farmer Password"
            name="password"
            required
            value={inputs.password}
            onChange={handleChange}
          />
        </div>
        <div className="data_form_section">
          <label className="data_from_lable">Phone</label>
          <input
            className="data_from_input"
            type="text"
            id="phone"
            placeholder="Enter Farmer Phone Number"
            name="phone"
            required
            onChange={(e) => {
              const re = /^[0-9\b]{0,10}$/;
              if (re.test(e.target.value)) {
                handleChange(e);
              }
            }}
            maxLength="10"
            pattern="[0-9]{10}"
            title="Please enter exactly 10 digits."
            value={inputs.phone}
          />
        </div>
        <div className="data_form_section">
          <label className="data_from_lable">Address</label>
          <textarea
            className="data_from_input"
            type="text"
            id="address"
            placeholder="Enter Farmer Address"
            name="address"
            required
            rows={3}
            value={inputs.address}
            onChange={handleChange}
          />
        </div>
        <button className="from_btn">Add</button>
      </form>
    </div>
  );
}

export default AddFarmer;
