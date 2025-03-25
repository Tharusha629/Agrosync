// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import AdminNavBar from "./AdminNavBar";
function ReplyInquiries() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8085/customer/${id}`
        );
        setInputs(response.data.inquirie);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [id]);
  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8085/customer/${id}`, {
        inquirieID: String(inputs.inquirieID),
        userID: String(inputs.userID),
        fullName: String(inputs.fullName),
        subject: String(inputs.subject),
        inquirieMsg: String(inputs.inquirieMsg),
        reply: String(inputs.reply),
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
      window.alert("Reply Send successfully!");
      history("/allInquiries");
    });
  };
  return (
    <div>
      <AdminNavBar />
      <p className="topic_from">
        Reply Inquiry <span className="dot">.</span>
      </p>
      <form onSubmit={handleSubmit} className="data_form">
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
            readOnly
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
            readOnly
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
            readOnly
            value={inputs.subject}
            onChange={handleChange}
          />
        </div>
        <div className="data_form_section">
          <label className="data_from_lable">Message</label>
          <textarea
            className="data_from_input"
            type="text"
            id="inquirieMsg"
            placeholder="Enter Your Message"
            name="inquirieMsg"
            readOnly
            rows={5}
            value={inputs.inquirieMsg}
            onChange={handleChange}
          />
        </div>
        <div className="data_form_section">
          <label className="data_from_lable">Reply</label>
          <textarea
            type="text"
            id="reply"
            placeholder="Enter Your Reply Message"
            name="reply"
            className="data_from_input"
            rows={5}
            value={inputs.reply}
            onChange={handleChange}
          />
        </div>
        <button className="from_btn">Reply</button>
      </form>
    </div>
  );
}

export default ReplyInquiries;
