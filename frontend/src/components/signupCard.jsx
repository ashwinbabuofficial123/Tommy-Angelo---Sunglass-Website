import "../css/signupCard.css";
import { useState } from "react";
import axios from "../../utils/axiosInstance";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupCard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const onInput = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };
  console.log(data);

  const onSignup = async () => {
    try {
      if (!data.name && data.email && data.password && data.confirmpassword) {
        return (toast("Fill All the Input"), console.log(error));
      } else {
        const res = await axios.post("/signup", data);
        console.log(res);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="signup-card">
        <div className="mainText">
          <p>Welcome</p>
          <h1>Create Account</h1>
          <p>Join us to track orders, save favorites and more.</p>
          <div className="skip-signup">Skip</div>
        </div>
        <div className="input-wrp">
          <div className="input-container">
            <label>Full Name*</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              onChange={onInput}
            />
          </div>
          <div className="input-container">
            <label>Email Address*</label>
            <input
              type="text"
              name="email"
              placeholder="you@example.com"
              onChange={onInput}
              autoComplete="off"
            />
          </div>
          <div className="input-container">
            <label>Password*</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              onChange={onInput}
              autoComplete="new-password"
            />
          </div>
          <div className="input-container">
            <label>Confirm Password*</label>
            <input
              type="password"
              name="confirmpassword"
              placeholder="Re-enter your password"
              onChange={onInput}
              autoComplete="new-password"
            />
          </div>
        </div>
        <button className="signupbtn" onClick={onSignup}>
          SIGNUP
        </button>{" "}
        <div className="forget-wrp">
          <span>Already have an account?</span>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </>
  );
};
export default SignupCard;
