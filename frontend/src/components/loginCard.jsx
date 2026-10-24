import "../css/loginCard.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "./button";
import closeCard from "../assets/images/close.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import { useLocation } from "react-router-dom";

const LoginCard = ({ cardName, onClose, backgroundChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [close, setClose] = useState(false);
  const [login, setLogin] = useState({ email: "", password: "" });

  const onInput = (e) => {
    try {
      setLogin({ ...login, [e.target.name]: e.target.value });
    } catch (error) {
      console.log(error);
    }
  };

  const onLogin = async () => {
    try {
      const res = await axios.post("/login", login);
      console.log(res);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.userObj));

      // NEW: Admin goes to the admin page, everyone else goes to home
      // CHANGE "role" if your user field has a different name
      if (res.data.userObj.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      setClose(true);
    } catch (error) {
      console.log(error);
      toast.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  console.log(login);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setClose(true);
    else setClose(false);
  }, []);

  return (
    <>
      <div
        className={
          close
            ? `backGround background-close`
            : `backGround ${backgroundChange}`
        }
      ></div>
      <div className={close ? `login-card closeLog` : `login-card ${cardName}`}>
        <div className="close-btn">
          <img src={closeCard} alt="" />
        </div>
        <div className="mainText">
          <p>Welcome Back</p>
          <h1>Login to Account </h1>
          <p>Access your orders, save your favorites and more.</p>
          <div className="skip" onClick={onClose}>
            Skip
          </div>
        </div>
        <div className="input-wrp">
          <div className="input-container">
            <label htmlFor="">Email Address*</label>
            <input
              type="text"
              name="email"
              id=""
              placeholder="you@example.com"
              onChange={onInput}
            />
          </div>
          <div className="input-container">
            <label htmlFor="">Password*</label>
            <input
              type="password"
              name="password"
              id=""
              placeholder="Enter your Password"
              onChange={onInput}
            />
          </div>
        </div>{" "}
        <Button btnClass={`login-btn`} btnSpan={`login-text`} onClick={onLogin}>
          LOGIN
        </Button>
        <div className="forget-wrp">
          <div className="input-checkwrp">
            <input type="checkbox" name="" id="" />
            Remember Me
          </div>
          <Link>Forget Password</Link>
        </div>
        <div className="google-links">
          <button className="google">Continue with Google Account</button>
          <span>
            Dont Have and Account{" "}
            <Link onClick={() => navigate("/signup")}>Signup</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default LoginCard;
