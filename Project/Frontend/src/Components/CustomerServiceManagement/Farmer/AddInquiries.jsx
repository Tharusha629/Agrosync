// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import axios from "axios";
import "./inquiries.css";
import NavBar from "../../Home/NavBar";
function AddInquiries() {
  const [inputs, setInputs] = useState({
    inquirieID: "",
    userID: "",
    fullName: "",
    subject: "",
    inquirieMsg: "",
  });
  const generateID = () => {
    const prefix = "IID ";
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    return `${prefix}${randomNumber}`;
  };
  useEffect(() => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      inquirieID: generateID(),
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
  useEffect(() => {
    const userID = localStorage.getItem("UserID");

    setInputs((prevInputs) => ({
      ...prevInputs,
      inquirieID: generateID(),
      userID: userID || "",
    }));
  }, []);
  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:8085/customer", {
        inquirieID: inputs.inquirieID,
        userID: inputs.userID,
        fullName: inputs.fullName,
        email: inputs.email,
        subject: inputs.subject,
        inquirieMsg: inputs.inquirieMsg,
      });

      if (response.status === 200) {
        window.alert(
          "We have received your inquiry and will contact you shortly"
        );
        window.location.reload();
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
        window.alert("An error occurred ");
      }
    }
  };
  return (
    <div>
      <NavBar />
      <p className="topic_from">
        Send Inquiry <span className="dot">.</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="data_form"
      >
        <div className="data_form_section">
          <label className="data_from_lable">inquirie ID</label>
          <input
            className="data_from_input"
            type="text"
            id="inquirieID"
            name="inquirieID"
            readOnly
            value={inputs.inquirieID}
          />
        </div>
        <div className="data_form_section">
          <label className="data_from_lable">Full Name</label>
          <input
            className="data_from_input"
            type="text"
            id="fullName"
            name="fullName"
            required
            placeholder="Enter Full Name"
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
          <label className="data_from_lable">email</label>
          <input
            className="data_from_input"
            type="email"
            id="email"
            placeholder="Enter email"
            name="email"
            required
            value={inputs.email}
            onChange={handleChange}
          />
        </div>
        <div className="data_form_section">
          <label className="data_from_lable">subject</label>
          <input
            className="data_from_input"
            type="text"
            id="subject"
            placeholder="Enter subject"
            name="subject"
            required
            value={inputs.subject}
            onChange={handleChange}
          />
        </div>
        <div className="data_form_section">
          <label className="data_from_lable">Message</label>
          <textarea
            type="text"
            id="inquirieMsg"
            placeholder="Enter Your Message"
            name="inquirieMsg"
            className="data_from_input"
            required
            rows={3}
            value={inputs.inquirieMsg}
            onChange={handleChange}
          />
        </div>
        <button className="from_btn">send</button>
      </form>
    </div>
  );
}

export default AddInquiries;
