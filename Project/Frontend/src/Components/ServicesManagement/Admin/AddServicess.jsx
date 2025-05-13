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
    verificationCode: "" // Added verification code field
  });

  const [verificationSent, setVerificationSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);

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

  const sendVerificationCode = async () => {
    // In a real app, you would send this to the user's email/phone
    // For demo, we'll just show it in an alert
    const demoCode = Math.floor(1000 + Math.random() * 9000);
    alert(`Your verification code is: ${demoCode}`);
    setVerificationSent(true);
  };

  const verifyCode = () => {
    // In a real app, you would verify this against what was sent to the user
    // For demo, we'll just assume any 4-digit code is valid
    if (/^\d{4}$/.test(inputs.verificationCode)) {
      setCodeVerified(true);
      alert("Code verified successfully!");
    } else {
      alert("Please enter a valid 4-digit code");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!codeVerified) {
      alert("Please verify your code first");
      return;
    }
    
    await sendRequest();
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:8085/service", {
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
        window.alert(error.response.data.message);
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
        
        {/* Verification Code Section */}
        <div className="data_form_section">
          <label className="data_from_lable">Verification</label>
          {!verificationSent ? (
            <button 
              type="button" 
              className="from_btn"
              onClick={sendVerificationCode}
            >
              Send Verification Code
            </button>
          ) : !codeVerified ? (
            <div style={{display: 'flex', gap: '10px'}}>
              <input
                className="data_from_input"
                type="text"
                id="verificationCode"
                name="verificationCode"
                placeholder="Enter verification code"
                value={inputs.verificationCode}
                onChange={handleChange}
                style={{flex: 1}}
              />
              <button 
                type="button" 
                className="from_btn"
                onClick={verifyCode}
              >
                Verify
              </button>
            </div>
          ) : (
            <span style={{color: 'green'}}>✓ Verified</span>
          )}
        </div>
        
        <button 
          className="from_btn" 
          type="submit"
          disabled={!codeVerified}
        >
          Add Service
        </button>
      </form>
    </div>
  );
}

export default AddServicess;