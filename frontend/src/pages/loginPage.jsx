import "../css/loginPage.css";
import loginImage from "../assets/LoginImage.png";
import LoginImage from "../assets/golden.png";
import LoginCard from "../components/loginCard";

const LoginPage = () => {
  return (
    <>
      <div className="login-sec-container">
        <div className="img-login-wrp">
          <img src={loginImage} alt="" /> <img src={LoginImage} alt="" />
          <div className="text-wrap-">
            <div className="text-sec-wrap-">
              {" "}
              <h1>
                SEE BETTER, <br /> LIVE BOLDER
              </h1>
              <p>
                Sign in to continue your journey with <br /> Tommy Angelo.
              </p>
            </div>
            <div className="text-sec-wrap-">
              {" "}
              <h1>
                SEE BETTER, <br /> LIVE BOLDER
              </h1>
              <p>
                Sign in to continue your journey with <br /> Tommy Angelo.
              </p>
            </div>
            <div className="text-sec-wrap-">
              {" "}
              <h1>
                SEE BETTER, <br /> LIVE BOLDER
              </h1>
              <p>
                Sign in to continue your journey with <br /> Tommy Angelo.
              </p>
            </div>
            <div className="slide-bar-wrap">
              <div className="slide-wrap">hi</div>
              <div className="slide-wrap">hi</div>
              <div className="slide-wrap">hi</div>
            </div>
          </div>
          <div className="text-wrap--"></div>
        </div>{" "}
        <LoginCard backgroundChange="backgroundChange" cardName="cardName" />
      </div>
    </>
  );
};

export default LoginPage;
