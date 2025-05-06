import { useState, useEffect } from "react";
import axios from "axios";
import "./order.css";
import NavBar from "../../Home/NavBar";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router";
function AddOrder() {
  const history = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [email, setEmail] = useState("");
  const [inputCode, setInputCode] = useState("");
  const savedCode = localStorage.getItem("verificationCode");
  const [inputs, setInputs] = useState({
    orderID: "",
    serviceName: "",
    userID: "",
    servicePrice: "",
    fullName: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full name is required";
        if (!/^[A-Za-z\s]{2,50}$/.test(value))
          return "Name should only contain letters and spaces (2-50 characters)";
        return "";
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        return "";
      case "phone":
        if (!value) return "Phone number is required";
        if (!/^[0-9]{10}$/.test(value))
          return "Phone number must be exactly 10 digits";
        return "";
      case "address":
        if (!value.trim()) return "Address is required";
        if (value.length < 10)
          return "Address must be at least 10 characters long";
        if (value.length > 200)
          return "Address must not exceed 200 characters";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the input value
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));

    // Validate and update errors
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  useEffect(() => {
    // Fetch data from localStorage
    const userID = localStorage.getItem("UserID");
    const serviceName = localStorage.getItem("UserServiceName");
    const servicePrice = localStorage.getItem("UserServicePrice");

    // Update the inputs state with the fetched data
    setInputs((prevInputs) => ({
      ...prevInputs,
      userID: userID || "",
      serviceName: serviceName || "",
      servicePrice: servicePrice || "",
    }));
  }, []);
  const generateID = () => {
    const prefix = "OID ";
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    return `${prefix}${randomNumber}`;
  };
  useEffect(() => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      orderID: generateID(),
    }));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(inputs).forEach((key) => {
      if (["fullName", "email", "phone", "address"].includes(key)) {
        newErrors[key] = validateField(key, inputs[key]);
      }
    });

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error !== "")) {
      alert("Please fix all errors before submitting");
      return;
    }

    localStorage.setItem("EnterEmail", inputs.email);
    setShowModal(true);
  };
  const sendRequest = async () => {
    try {
      console.log("Sending request with data:", inputs); // Log the data being sent
      const response = await axios.post("http://localhost:8085/order", {
        orderID: inputs.orderID,
        serviceName: inputs.serviceName,
        servicePrice: inputs.servicePrice,
        fullName: inputs.fullName,
        phone: inputs.phone,
        address: inputs.address,
        userID: inputs.userID,
      });

      if (response.status === 200) {
        console.log("Data sent successfully:", response.data); // Log successful response
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error sending request:", error); // Log the error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        window.alert(error.response.data.message);
      } else {
        window.alert("An error occurred");
      }
    }
  };
  const Modal = ({ onClose, children }) => (
    <div className="modal-overlay">
      <div className="modal-content">
        <IoClose onClick={onClose} className="close_btn" />
        {children}
      </div>
    </div>
  );
  const handleSendCode = async () => {
    try {
      const checkResponse = await axios.post(
        "http://localhost:8085/order/send-email",
        {
          email: email,
        }
      );
      if (checkResponse.data.message === "Verification code sent") {
        const { code } = checkResponse.data;
        localStorage.setItem("verificationCode", code);
        localStorage.setItem("verificationgmail", email);
        alert("Verification code sent to your Gmail. Check it!");
        setIsCodeSent(true);
      } else {
        alert("This email is not registered. Please enter a registered email.");
      }
    } catch (error) {
      console.error("Error during email validation or sending", error);
      alert("This email is not registered. Please enter a registered email");
    }
  };
  useEffect(() => {
    if (showModal) {
      const savedEmail = localStorage.getItem("EnterEmail");
      if (savedEmail) {
        setEmail(savedEmail); // Set the email state from localStorage
      }
    }
  }, [showModal]);
  const handleVerify = async () => {
    if (inputCode === savedCode) {
      const orderData = {
        orderID: inputs.orderID,
        serviceName: inputs.serviceName,
        servicePrice: inputs.servicePrice,
        fullName: inputs.fullName,
        phone: inputs.phone,
        address: inputs.address,
      };
      localStorage.setItem("orders", JSON.stringify([orderData]));
      await sendRequest();
      alert("Verification successful !");
      history("/shippingLabel");
    } else {
      alert("Invalid verification code.");
    }
  };
  return (
    <div>
      <NavBar />
      <p className="topic_from">
        Thank You for Choosing Us <span className="dot_new">!</span>
      </p>
      <form className="data_form" onSubmit={handleSubmit}>
        <p className="order_details_topic">Your Order Details</p>
        <div className="order_detail_card">
          <div className="data_form_section">
            <label className="data_from_lable">
              order ID :{" "}
              <span className="data_from_lable_sub">{inputs.orderID}</span>
            </label>
          </div>
          <div className="data_form_section">
            <label className="data_from_lable">
              service Name :{" "}
              <span className="data_from_lable_sub">{inputs.serviceName}</span>
            </label>
          </div>
          <div className="data_form_section">
            <label className="data_from_lable">
              service Price :{" "}
              <span className="data_from_lable_sub">
                ${inputs.servicePrice}
              </span>
            </label>
          </div>
        </div>
        <p className="order_details_topic">
          Fill this information and continue your order
        </p>
        <br />
        <div className="data_form_section">
          <label className="data_from_lable">full Name</label>
          <input
            className={`data_from_input ${errors.fullName ? "error-input" : ""}`}
            type="text"
            id="fullName"
            name="fullName"
            required
            placeholder="Enter Your Full Name"
            value={inputs.fullName}
            onChange={handleChange}
          />
          {errors.fullName && (
            <span className="error-message">{errors.fullName}</span>
          )}
        </div>
        <div className="data_form_section">
          <label className="data_from_lable">email</label>
          <input
            className={`data_from_input ${errors.email ? "error-input" : ""}`}
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter Your Email"
            value={inputs.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <div className="data_form_section">
          <label className="data_from_lable">Phone</label>
          <input
            className={`data_from_input ${errors.phone ? "error-input" : ""}`}
            type="text"
            id="phone"
            placeholder="Enter Your Phone Number"
            name="phone"
            required
            onChange={handleChange}
            maxLength="10"
            value={inputs.phone}
          />
          {errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>
        <div className="data_form_section">
          <label className="data_from_lable">Address</label>
          <textarea
            className={`data_from_input ${errors.address ? "error-input" : ""}`}
            type="text"
            id="address"
            placeholder="Enter Your Address"
            name="address"
            required
            rows={2}
            value={inputs.address}
            onChange={handleChange}
          />
          {errors.address && (
            <span className="error-message">{errors.address}</span>
          )}
        </div>
        <br />
        <button className="from_btn">confirm payment</button>
      </form>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <br />
          {!isCodeSent ? (
            <div>
              <p className="data_from_lable">
                click send button and check email
              </p>
              <br />
              <input
                className="data_from_input"
                type="email"
                value={email} // Ensure this is bound to the `email` state
                onChange={(e) => setEmail(e.target.value)} // Update the state correctly
                readOnly
              />
              <br /> <br />
              <button onClick={handleSendCode} className="from_btn">
                Send Verification Code
              </button>
            </div>
          ) : (
            <>
              <p className="data_from_lable">enter your verification code</p>
              <br />
              <input
                className="data_from_input"
                type="text"
                placeholder="Enter Verification Code"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />
              <br /> <br />
              <button onClick={handleVerify} className="from_btn">
                Verify Code
              </button>
            </>
          )}
        </Modal>
      )}
    </div>
  );
}

export default AddOrder;
