// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import axios from "axios";
import "./acc.css";

function Register() {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    phone: false,
    address: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));

    // Validate on change only if the field has been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "fullName":
        if (!value.trim()) {
          error = "Full name is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          error = "Full name should only contain letters and spaces";
        } else if (value.length < 3) {
          error = "Full name should be at least 3 characters";
        }
        break;
        
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
        
      case "password":
        if (!value.trim()) {
          error = "Password is required";
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters";
        } else if (!/(?=.*[A-Z])/.test(value)) {
          error = "Password must contain at least one uppercase letter";
        } else if (!/(?=.*[0-9])/.test(value)) {
          error = "Password must contain at least one number";
        } else if (!/(?=.*[!@#$%^&*])/.test(value)) {
          error = "Password must contain at least one special character";
        }
        break;
        
      case "phone":
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!/^[0-9]{10}$/.test(value)) {
          error = "Phone number must be exactly 10 digits";
        }
        break;
        
      case "address":
        if (!value.trim()) {
          error = "Address is required";
        } else if (value.length < 10) {
          error = "Address should be at least 10 characters";
        }
        break;
        
      default:
        break;
    }
    
    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error; // Return true if valid, false if invalid
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    Object.keys(inputs).forEach((field) => {
      const fieldValid = validateField(field, inputs[field]);
      if (!fieldValid) isValid = false;
    });
    
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched when submitting
    const allTouched = {};
    Object.keys(touched).forEach((field) => {
      allTouched[field] = true;
    });
    setTouched(allTouched);
    
    const isFormValid = validateForm();
    
    if (isFormValid) {
      await sendRequest();
    }
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
        window.alert("Registered successfully!");
        window.location.href = "./";
      }
    } catch (error) {
      if (error.response?.data?.message) {
        window.alert(error.response.data.message);
      } else {
        window.alert("An error occurred while creating the account.");
      }
    }
  };

  return (
    <div className="bk_test">
      <div className="auth_from_regi">
        <form className="auth_from_rg" onSubmit={handleSubmit}>
          <p className="auth_topic">Welcome Our Family</p>
          <p className="auth_topic_sub">Enter Your Details And Join With Us.</p>
          
          <div>
            <label className="data_from_lable">Full Name</label>
            <input
              className={`data_from_input ${touched.fullName && errors.fullName ? "input-error" : ""}`}
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
              onBlur={handleBlur}
            />
            {touched.fullName && errors.fullName && (
              <div className="error-message">{errors.fullName}</div>
            )}
          </div>
          
          <div>
            <label className="data_from_lable">Email</label>
            <input
              className={`data_from_input ${touched.email && errors.email ? "input-error" : ""}`}
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter Your Email"
              value={inputs.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>
          
          <div>
            <label className="data_from_lable">Password</label>
            <input
              className={`data_from_input ${touched.password && errors.password ? "input-error" : ""}`}
              type="password"
              id="password"
              placeholder="Enter Your Password"
              name="password"
              required
              value={inputs.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>
          
          <div>
            <label className="data_from_lable">Phone</label>
            <input
              className={`data_from_input ${touched.phone && errors.phone ? "input-error" : ""}`}
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
              onBlur={handleBlur}
            />
            {touched.phone && errors.phone && (
              <div className="error-message">{errors.phone}</div>
            )}
          </div>
          
          <div>
            <label className="data_from_lable">Address</label>
            <textarea
              className={`data_from_input ${touched.address && errors.address ? "input-error" : ""}`}
              type="text"
              id="address"
              placeholder="Enter Your Address"
              name="address"
              required
              rows={2}
              value={inputs.address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.address && errors.address && (
              <div className="error-message">{errors.address}</div>
            )}
          </div>
          
          <button className="from_btn" type="submit">Sign Up</button>
          
          <p className="noacc">
            If you already have an account{" "}
            <span
              className="noacc_link"
              onClick={() => (window.location.href = "/")}
            >
              login
            </span>
          </p>
        </form>
        <div className="auth_from_colum_regi"></div>
      </div>
    </div>
  );
}

export default Register;