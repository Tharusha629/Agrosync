// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import "./servicess.css";
import AdminNavBar from "../../CustomerServiceManagement/Admin/AdminNavBar";
function UpdateServicess() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/service/${id}`);
        setInputs(response.data.service);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [id]);
  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8085/service/${id}`, {
        serviceID: String(inputs.serviceID),
        title: String(inputs.title),
        description: String(inputs.description),
        serviceSet: String(inputs.serviceSet),
        price: String(inputs.price),
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
      window.alert("Service Updated successfully!");
      history("/allServicess");
    });
  };
  return (
    <div>
      <AdminNavBar />
      <p className="topic_from">
        Update Service <span className="dot">.</span>
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
        <button className="from_btn">Update Service</button>
      </form>
    </div>
  );
}

export default UpdateServicess;
