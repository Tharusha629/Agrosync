// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import AdminNavBar from "../../CustomerServiceManagement/Admin/AdminNavBar";

function UpdateOrderStatus() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/order/${id}`);
        setInputs(response.data.order);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [id]);
  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8085/order/${id}`, {
        orderID: String(inputs.orderID),
        serviceName: String(inputs.serviceName),
        servicePrice: String(inputs.servicePrice),
        fullName: String(inputs.fullName),
        phone: String(inputs.phone),
        status: String(inputs.status),
      })
      .then((res) => res.data);
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => {
      window.alert("Status Update successfully!");
      history("/allOrders");
    });
  };
  return (
    <div>
      <AdminNavBar />
      <p className="topic_from">
        Update Order Status <span className="dot">.</span>
      </p>
      <form className="data_form" onSubmit={handleSubmit}>
        <div className="data_form_section">
          <label className="data_from_lable">order ID</label>
          <input
            className="data_from_input"
            type="text"
            id="orderID"
            name="orderID"
            readOnly
            value={inputs.orderID}
          />
        </div>
        <div className="data_form_section">
          <label className="data_from_lable">service Name</label>
          <input
            className="data_from_input"
            type="text"
            id="serviceName"
            name="serviceName"
            readOnly
            value={inputs.serviceName}
            onChange={handleChange}
          />
        </div>
        <div className="data_form_section">
          <label className="data_from_lable">service Price</label>
          <input
            className="data_from_input"
            type="text"
            id="servicePrice"
            name="servicePrice"
            readOnly
            value={inputs.servicePrice}
            onChange={handleChange}
          />
        </div>

        <div className="data_form_section">
          <label className="data_from_lable">fullName</label>
          <input
            className="data_from_input"
            type="text"
            id="fullName"
            name="fullName"
            readOnly
            value={inputs.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="data_form_section">
          <label className="data_from_lable">phone</label>
          <input
            className="data_from_input"
            type="text"
            id="phone"
            name="phone"
            readOnly
            value={inputs.phone}
            onChange={handleChange}
          />
        </div>

        <div className="data_form_section">
          <label className="data_from_lable">status</label>
          <select
            className="data_from_input"
            id="status"
            name="status"
            value={inputs.status} 
            onChange={handleChange} 
          >
            <option value="Confirm">Confirm</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <button className="from_btn">Update status</button>
      </form>
    </div>
  );
}

export default UpdateOrderStatus;
