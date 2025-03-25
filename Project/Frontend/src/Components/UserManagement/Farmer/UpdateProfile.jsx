// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import "./acc.css";
import NavBar from "../../Home/NavBar";
function UpdateProfile() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/user/${id}`);
        setInputs(response.data.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [id]);
  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8081/user/${id}`, {
        fullName: String(inputs.fullName),
        email: String(inputs.email),
        password: String(inputs.password),
        phone: String(inputs.phone),
        address: String(inputs.address),
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
      window.alert("Account Updated successfully!");
      history("/profile");
    });
  };
  return (
    <div>
      <NavBar />
      <p className="topic_from">
        Update user profile <span className="dot">.</span>
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
            placeholder="Enter Your Full Name"
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
            placeholder="Enter Your Email"
            value={inputs.email}
            onChange={handleChange}
          />
        </div>
        <div className="data_form_section">
          <label className="data_from_lable">Password</label>
          <input
            className="data_from_input"
            type="text"
            id="password"
            placeholder="Enter Your Password"
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
            placeholder="Enter Your Phone Number"
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
            placeholder="Enter Your Address"
            name="address"
            required
            rows={3}
            value={inputs.address}
            onChange={handleChange}
          />
        </div>
        <button className="from_btn">Update</button>
      </form>
    </div>
  );
}

export default UpdateProfile;
