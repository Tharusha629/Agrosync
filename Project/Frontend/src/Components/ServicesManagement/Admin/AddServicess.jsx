// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import axios from "axios";
import "./servicess.css";
import AdminNavBar from "../../CustomerServiceManagement/Admin/AdminNavBar";
function AddServicess() {
  const [inputs, setInputs] = useState({
    serviceID: "",
    title: "",
    description: "",
    serviceSet: "",
    price: "",
  });
  const generateID = () => {
    const prefix = "SID ";
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    return `${prefix}${randomNumber}`;
  };
  useEffect(() => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      serviceID: generateID(),
    }));
  }, []);
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
      const response = await axios.post("http://localhost:8081/service", {
        serviceID: inputs.serviceID,
        title: inputs.title,
        description: inputs.description,
        serviceSet: inputs.serviceSet,
        price: inputs.price,
      });
  
      if (response.status === 200) {
        window.alert("Service Added successfully!");
        window.location.href = "./allServicess";
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        window.alert(error.response.data.message); // Display the error message from the backend
      } else {
        window.alert("An error occurred");
      }
    }
  };
  return (
    <div>
      <AdminNavBar />
      <p className="topic_from">
        Add New Service <span className="dot">.</span>
      </p>
      <form className="data_form" onSubmit={handleSubmit}>
        <div className="data_form_section">
          <label className="data_from_lable">service ID</label>
          <input
            className="data_from_input"
            type="text"
            id="serviceID"
            name="serviceID"
            readOnly
            value={inputs.serviceID}
          />
        </div>
        <div className="data_form_section">
          <label className="data_from_lable">title</label>
          <input
            className="data_from_input"
            type="title"
            id="title"
            name="title"
            required
            placeholder="Enter Service title"
            value={inputs.title}
            onChange={handleChange}
          />
        </div>
        <div className="data_form_section">
          <label className="data_from_lable">description</label>
          <textarea
            className="data_from_input"
            type="text"
            id="description"
            placeholder="Enter Service Description"
            name="description"
            required
            rows={5}
            value={inputs.description}
            onChange={handleChange}
          />
        </div>
        <div className="data_form_section">
          <label className="data_from_lable">Provide servicess</label>
          <textarea
            className="data_from_input"
            type="text"
            id="serviceSet"
            placeholder="Provide services"
            name="serviceSet"
            required
            rows={5}
            value={inputs.serviceSet}
            onChange={handleChange}
          />
        </div>
        <div className="data_form_section">
          <label className="data_from_lable">price</label>
          <input
            className="data_from_input"
            type="number"
            id="price"
            name="price"
            required
            placeholder="Enter Service Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </div>
        <button className="from_btn">Add Service</button>
      </form>
    </div>
  );
}

export default AddServicess;
