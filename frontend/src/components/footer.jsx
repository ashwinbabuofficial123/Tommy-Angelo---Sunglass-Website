import "../css/footer.css";
import gradiantfooter from "../assets/images/Gradiant.png";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-wrp">
      <img src={gradiantfooter} alt="" className="gradients" />
      <div className="footer-Links-wrp">
        <img src={logo} alt="logo" style={{ width: "200px" }} />
        <div className="social-Links-wrp">
          <div className="social-link">
            <img
              src="https://img.icons8.com/fluency-systems-filled/35
                  /instagram-new.png"
              alt=""
            />
          </div>
          <div className="social-link">
            <img
              src="https://img.icons8.com/ios-filled/35/twitterx--v1.png"
              alt=""
            />
          </div>
          <div className="social-link">
            <img
              src="https://img.icons8.com/ios-filled/35/facebook--v1.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="footer-Links-wrp-sec">
        <div className="footer-links-sec">
          <h1>Shop & Collections</h1>
          <Link
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "clamp(1vw,8%,16px)",
            }}
          >
            New Arrivals
          </Link>
          <Link
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "clamp(1vw,8%,16px)",
            }}
          >
            Best Sellers
          </Link>
          <Link
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "clamp(1vw,8%,16px)",
            }}
          >
            Men’s Sunglasses
          </Link>
          <Link
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "clamp(1vw,8%,16px)",
            }}
          >
            Women’s Sunglasses
          </Link>
          <Link
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "clamp(1vw,8%,16px)",
            }}
          >
            Polarized Collection
          </Link>
        </div>
        <div className="footer-links-sec">
          <h1>Fit & Tech Guide</h1>
          <Link
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "clamp(1vw,8%,16px)",
            }}
          >
            Virtual Try-On
          </Link>
          <Link
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "clamp(1vw,8%,16px)",
            }}
          >
            Face Shape Guide
          </Link>
          <Link
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "clamp(1vw,8%,16px)",
            }}
          >
            Frame Fit & Size Chart
          </Link>
          <Link
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "clamp(1vw,8%,16px)",
            }}
          >
            Lens Technology & UV Protection
          </Link>
          <Link
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "clamp(1vw,8%,16px)",
            }}
          >
            Care & Cleaning Instructions
          </Link>
        </div>
        <div className="footer-links-sec">
          <h1>Customer Support</h1>
          <Link
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "clamp(1vw,8%,16px)",
            }}
          >
            Track My Order
          </Link>
          <Link
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "clamp(1vw,8%,16px)",
            }}
          >
            Shipping & Delivery Info
          </Link>
          <Link
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "clamp(1vw,8%,16px)",
            }}
          >
            Returns & Exchanges{" "}
          </Link>
          <Link
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "clamp(1vw,8%,16px)",
            }}
          >
            Warranty & Repair Request
          </Link>
          <Link
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "clamp(1vw,8%,16px)",
            }}
          >
            FAQ & Help Center
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
