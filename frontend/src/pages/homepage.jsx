import "../css/homepage.css";
import raybanlogo from "../assets/rayban-logo.png";
import gradiantfooter from "../assets/images/Gradiant.png";
import logo from "../assets/Logo.png";
import metalogo from "../assets/meta.png";
import info1 from "../assets/info(1).png";
import info2 from "../assets/info(2).png";
import info3 from "../assets/info(3).png";
import info4 from "../assets/info(4).png";
import review1 from "../assets/images/RaybanReview.png";
import review2 from "../assets/images/OakleyReview.png";
import review3 from "../assets/images/Review.png";
import review4 from "../assets/images/GucciReview.png";
import pradacover from "../assets/images/Prada.png";
import raybancover from "../assets/images/Rayban.jpg";
import oakleycover from "../assets/images/Oakley.webp";
import guccicover from "../assets/images/gucci.png";
import raybanSide from "../assets/images/RaybanSide.png";
import LoginCard from "../components/loginCard";
import brandLogo from "../assets/images/brandlogo.png";
import heroImage from "../assets/images/HeroImage.png";
import heroRes from "../assets/images/ResponsiveImage.png";
import Button from "../components/button";
import aviator from "../assets/images/Aviator.png";
import wayfarer from "../assets/images/Wayfarer.png";
import round from "../assets/images/Round.png";
import sport from "../assets/images/Sport.png";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import ProductCard from "../components/product-card";
import { ToastContainer } from "react-toastify";
import Footer from "../components/footer";

// NEW: customer reviews data. To add a review, copy one block and change the text.
const reviews = [
  {
    id: 1,
    name: "Arjun Menon",
    city: "Kochi",
    rating: 5,
    product: "Aviator",
    text: "Super light and the lenses are crystal clear. I wear them all day and they never slip. Delivery was quick too.",
  },
  {
    id: 2,
    name: "Fathima Nasrin",
    city: "Kozhikode",
    rating: 5,
    product: "Wayfarer",
    text: "The fit is perfect and the finish looks way more expensive than the price. I got so many compliments.",
  },
  {
    id: 3,
    name: "Rahul Nair",
    city: "Trivandrum",
    rating: 4,
    product: "Sports",
    text: "Great for riding and running. Grip is solid even when I sweat. Would love a few more colour options.",
  },
  {
    id: 4,
    name: "Sneha Thomas",
    city: "Bengaluru",
    rating: 5,
    product: "Round",
    text: "Exactly like the photos. The case and packaging felt premium and the UV protection is great in the afternoon sun.",
  },
  {
    id: 5,
    name: "Vishnu Prasad",
    city: "Chennai",
    rating: 4,
    product: "Meta AI Gen 1",
    text: "Taking photos hands-free is addictive. Sound quality on calls is better than I expected. Battery lasts a full day.",
  },
  {
    id: 6,
    name: "Anjali Das",
    city: "Thrissur",
    rating: 5,
    product: "Aviator",
    text: "Easy returns and helpful support when I needed a different size. Will definitely order again.",
  },
];

const HomePage = () => {
  const [loginPop, setLoginPop] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const newArrivalRef = useRef(null);
  const bestSellerRef = useRef(null);
  const reviewRef = useRef(null); // NEW: used to slide the review cards
  const productId = "6a994df1470629ee70895e57";
  const slide = (ref, direction) => {
    console.log(direction);
    console.log(ref);
    ref.current?.scrollBy({
      left: direction === "next" ? 480 : -480,
      behavior: "smooth",
    });
  };

  const goToProducts = () => {
    navigate(`/products`);
  };
  // motion
  const heroContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3, delayChildren: 0.5 } },
  };
  const heroTexts = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };
  const heroImageMotion = {
    hidden: { opacity: 0, top: 50 },
    visible: {
      opacity: 1,
      top: 0,
      transition: { duration: 2, ease: "easeInOut" },
    },
  };

  const textAnimate = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3, delayChildren: 0.5 } },
  };
  const textItems = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.1, ease: "easeInOut" },
    },
  };

  const catAnimate = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const catBoxAnimate = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.1, ease: "easeIn" },
    },
  };
  // motion

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoginPop(false);
    } else {
      const timer = setTimeout(() => {
        setLoginPop(true);
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        document
          .getElementById(location.state.scrollTo)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);
  return (
    <>
      <div className="homepage">
        <motion.div className="heroSection">
          <motion.div
            className="hero-text-sec"
            variants={heroContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="brandLogo" variants={heroTexts}>
              <img src={brandLogo} alt="" />
            </motion.div>
            <div className="heroText">
              <motion.h1 variants={heroTexts}>
                Meet the Future of <br /> Eyewear.
              </motion.h1>
              <motion.p variants={heroTexts}>
                AI-powered vision. Timeless design. Capture, listen, and{" "}
                <br className="break-point" /> stay connected—without reaching
                for your phone.
              </motion.p>
            </div>
          </motion.div>
          <motion.div
            className="heroImage"
            variants={heroImageMotion}
            initial="hidden"
            animate="visible"
            exit={{
              scale: 2,
              opacity: 0,
              transition: {
                duration: 0.5,
              },
            }}
          >
            <img src={heroImage} alt="" />
          </motion.div>
          <div className="heroImgRes">
            <img src={heroRes} alt="" />
          </div>
          <div className="btn-wrp">
            {/* NEW: onClick added, opens all products */}
            <Button
              btnClass="btnClass"
              btnSpan="btnSpan"
              onClick={() => navigate("/products")}
            >
              EXPLORE COLLECTIONS
            </Button>
            <Button
              onClick={() => {
                navigate(`/product/${productId}`);
              }}
            >
              SHOP NOW
            </Button>
          </div>
        </motion.div>
        <div className="categories-sec-wrap">
          <motion.div
            className="cat-text-wrap"
            variants={textAnimate}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              Explore meticulously crafted collections designed to complement
              every face, occasion, and expression.
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              CATEGORIES
            </motion.h1>
          </motion.div>
          <motion.div
            className="cat-box-wrp"
            variants={catAnimate}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="cat-box"
              variants={catBoxAnimate}
              whileHover={{ y: "-15%" }}
              transition={{
                duration: 0.1,
                ease: "easeInOut",
              }}
            >
              <div className="text-wrp-cat" onClick={goToProducts}>
                <h1>AVIATOR</h1>
                <p>Elevate Every Horizon</p>
              </div>
              <div className="catImage">
                <img src={aviator} alt="" className="cat-Image" />
              </div>
              <button className="shop-btn">SHOP NOW →</button>
            </motion.div>
            <motion.div
              className="cat-box"
              variants={catBoxAnimate}
              whileHover={{ y: "-15%" }}
              transition={{
                duration: 0.1,
                ease: "easeInOut",
              }}
            >
              {/* NEW: onClick added (same as Aviator) */}
              <div className="text-wrp-cat" onClick={goToProducts}>
                <h1>WAYFARER</h1>
                <p>The Icon, Reinvented</p>
              </div>
              <div className="catImage">
                <img src={wayfarer} alt="" className="cat-Image" />
              </div>
            </motion.div>
            <motion.div
              className="cat-box"
              variants={catBoxAnimate}
              whileHover={{ y: "-15%" }}
              transition={{
                duration: 0.1,
                ease: "easeInOut",
              }}
            >
              {/* NEW: onClick added */}
              <div className="text-wrp-cat" onClick={goToProducts}>
                <h1>ROUND</h1>
                <p>Perfectly Distinct</p>
              </div>
              <div className="catImage">
                <img src={round} alt="" className="cat-Image" />
              </div>
            </motion.div>
            <motion.div
              className="cat-box"
              variants={catBoxAnimate}
              whileHover={{ y: "-15%" }}
              transition={{
                duration: 0.1,
                ease: "easeIn",
              }}
            >
              {/* NEW: onClick added */}
              <div className="text-wrp-cat" onClick={goToProducts}>
                <h1>SPORTS</h1>
                <p>Engineered for Motion</p>
              </div>
              <div className="catImage">
                <img src={sport} alt="" className="cat-Image" />
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="new-arrival-sec">
          <div className="text-new-wrap">
            <h1>JUST DROPPED</h1>
            <p>
              Fresh silhouettes engineered to elevate every look, from everyday
              essentials to statement pieces.
            </p>{" "}
            <div className="slide-wrap">
              <motion.button
                whileHover={{
                  backgroundColor: "#000",
                  color: "#FFF",
                  transition: { duration: 0.3, ease: "ease" },
                }}
                onClick={() => slide(newArrivalRef, "prev")}
              >
                Previous
              </motion.button>

              <motion.button
                whileHover={{
                  backgroundColor: "#000",
                  color: "#FFF",
                  transition: { duration: 0.3, ease: "ease" },
                }}
                onClick={() => slide(newArrivalRef, "next")}
              >
                Next
              </motion.button>
            </div>
          </div>
          <div className="product-container-wrp" ref={newArrivalRef}>
            {" "}
            <ProductCard type="allProducts" />
          </div>
        </div>
        <div className="feautured-product">
          <motion.h1
            className="feauturedHead"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            FEAUTURED
          </motion.h1>
          <div className="main-feat-wrp">
            <motion.div
              className="feat-txt-wrp"
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
                transition: { duration: 0.3, ease: "easeIn" },
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="brand-wrp-ft">
                <img src={raybanlogo} alt="" />
                <img src={metalogo} alt="" />
              </div>
              <h1>META AI GEN 1</h1>
              <p>
                The Ray-Ban Meta (Gen 1) smart glasses seamlessly combine iconic
                eyewear designs <br /> like the Wayfarer with hands-free
                capture, spatial audio, and AI assistant <br /> capabilities.
              </p>
              {/* NEW: onClick added, opens the featured product */}
              <Button
                btnClass="discoverBtn"
                btnSpan="discoverSpan"
                onClick={() => navigate(`/product/${productId}`)}
              >
                DISCOVER MORE
              </Button>
            </motion.div>
            <motion.div
              className="featImg"
              initial={{ opacity: 0, x: 300 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { duration: 1, ease: "easeInOut" },
              }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <img src={raybanSide} alt="Raybnaside" />
            </motion.div>
          </div>
          <div className="scroll-features">
            <div className="featBox">
              <div className="imgFeat">
                <img src={info1} alt="info" className="img-ft" />
              </div>
              <div className="featTextWrp">
                <h1>
                  <img
                    src="https://img.icons8.com/ios-filled/32/audio-wave--v1.png"
                    alt=""
                  />
                  Ask Meta AI
                </h1>
                <p>
                  Take on life with AI that helps you flow through your day.
                  When activated, Meta AI can analyse your surroundings and
                  provide context-rich suggestions.
                </p>
              </div>
            </div>
            <div className="featBox">
              <div className="featTextWrp">
                <h1>
                  <img
                    src="https://img.icons8.com/?size=32&id=7211&format=png&color=000000"
                    alt=""
                  />
                  Capture every moment
                </h1>
                <p>
                  Capture what you see and hear hands-free. Press the capture
                  button or say "Hey Meta, take a photo" to take high-quality
                  photos and videos with an upgraded ultrawide 12 MP camera and
                  five-mic system.
                </p>
              </div>
              <div className="imgFeat">
                <img src={info2} alt="" />{" "}
              </div>
            </div>
            <div className="featBox">
              <div className="imgFeat">
                <img src={info3} alt="info" />{" "}
              </div>
              <div className="featTextWrp">
                <h1>
                  {" "}
                  <img
                    src="https://img.icons8.com/ios-filled/32/musical-notes.png"
                    alt=""
                  />
                  Listen with built-in speakers
                </h1>
                <p>
                  Bluetooth-connected speakers built into the arms of the
                  glasses deliver sound only you can hear, while five built-in
                  microphones pick up crisp audio for phone calls.
                </p>
              </div>
            </div>
            <div className="featBox">
              {" "}
              <div className="featTextWrp">
                <h1>
                  <img
                    src="https://img.icons8.com/ios-filled/32/phone.png"
                    alt=""
                  />
                  Communicate hands-free
                </h1>
                <p>
                  Send text or voice messages, make phone calls and take video
                  calls hands-free – all from your AI glasses.
                </p>
              </div>
              <div className="imgFeat">
                <img src={info4} alt="info" />{" "}
              </div>
            </div>
            <div className="featBox">
              <div className="imgFeat">
                <img src={info1} alt="info" className="img-ft" />
              </div>
              <div className="featTextWrp">
                <h1>
                  <img
                    src="https://img.icons8.com/ios-filled/32/audio-wave--v1.png"
                    alt=""
                  />
                  Ask Meta AI
                </h1>
                <p>
                  Take on life with AI that helps you flow through your day.
                  When activated, Meta AI can analyse your surroundings and
                  provide context-rich suggestions.
                </p>
              </div>
            </div>
            <div className="featBox">
              <div className="featTextWrp">
                <h1>
                  <img
                    src="https://img.icons8.com/?size=32&id=7211&format=png&color=000000"
                    alt=""
                  />
                  Capture every moment
                </h1>
                <p>
                  Capture what you see and hear hands-free. Press the capture
                  button or say "Hey Meta, take a photo" to take high-quality
                  photos and videos with an upgraded ultrawide 12 MP camera and
                  five-mic system.
                </p>
              </div>
              <div className="imgFeat">
                <img src={info2} alt="" />{" "}
              </div>
            </div>
            <div className="featBox">
              <div className="imgFeat">
                <img src={info3} alt="info" />{" "}
              </div>
              <div className="featTextWrp">
                <h1>
                  {" "}
                  <img
                    src="https://img.icons8.com/ios-filled/32/musical-notes.png"
                    alt=""
                  />
                  Listen with built-in speakers
                </h1>
                <p>
                  Bluetooth-connected speakers built into the arms of the
                  glasses deliver sound only you can hear, while five built-in
                  microphones pick up crisp audio for phone calls.
                </p>
              </div>
            </div>
            <div className="featBox">
              {" "}
              <div className="featTextWrp">
                <h1>
                  <img
                    src="https://img.icons8.com/ios-filled/32/phone.png"
                    alt=""
                  />
                  Communicate hands-free
                </h1>
                <p>
                  Send text or voice messages, make phone calls and take video
                  calls hands-free – all from your AI glasses.
                </p>
              </div>
              <div className="imgFeat">
                <img src={info4} alt="info" />{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="new-arrival-sec">
          <div className="text-new-wrap">
            <h1>BEST SELLER</h1>
            <p>favorites, handpicked for you. Premium quality lconic style</p>
            <div className="slide-wrap">
              <button
                onClick={() => slide(bestSellerRef, "prev")}
                className={newArrivalRef < 0 ? "active  active-link" : ""}
              >
                Previous
              </button>

              <button onClick={() => slide(bestSellerRef, "next")}>Next</button>
            </div>
          </div>
          <div className="product-container-wrp" ref={bestSellerRef}>
            {" "}
            <ProductCard type="allProducts" />
          </div>
        </div>
        <div className="brands-sec">
          <motion.h1
            style={{ textAlign: "center", fontSize: "13.021vw" }}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            BRANDS
          </motion.h1>
          <div className="card-wrp">
            {/* NEW: onClick added on each brand card.
                CHANGE the brand names to match what is saved in your database */}
            <div
              className="card-brand"
              onClick={() => goToProducts("brand", "Ray-Ban")}
            >
              <img src={raybancover} alt="" className="brnd-img" />
              <h1>RAYBAN</h1>
            </div>
            <div
              className="card-brand"
              onClick={() => goToProducts("brand", "Oakley")}
            >
              <img src={oakleycover} alt="" className="brnd-img" />
              <h1>OAKLEY</h1>
            </div>
            <div
              className="card-brand"
              onClick={() => goToProducts("brand", "Gucci")}
            >
              <img src={guccicover} alt="" className="brnd-img" />
              <h1>GUCCI</h1>
            </div>
            <div
              className="card-brand"
              onClick={() => goToProducts("brand", "Tommy Angelo")}
            >
              <img src={pradacover} alt="" className="brnd-img" />
              <h1>TOMMY ANGELO</h1>
            </div>
          </div>
        </div>
        <div className="lifestyleImages-wrp">
          <div className="lifeStyle-textWrp">
            <h1>LIFESTYLE GALLERY</h1>
            <p>Real People, Real Style, Share your Look with Us !</p>
          </div>
          <div className="reviewCard-wrp">
            <div className="reviewImages-grid gridBox1">
              <img src={review1} alt="" />
            </div>
            <div className="reviewImages-grid gridBox2">
              <img src={review2} alt="" />
            </div>
            <div className="reviewImages-grid gridBox3">
              <img src={review3} alt="" />
            </div>
            <div className="reviewImages-grid gridBox4">
              <img src={review4} alt="" />
              <div className="viewmore">
                {/* NEW: "to" added so the link works */}
                <Link
                  to="/products"
                  style={{
                    color: "white",
                    fontSize: "24px",
                    textDecoration: "none",
                  }}
                >
                  View More →
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="customerReview-wrp">
          <div className="textReviewWrp">
            <h1>CUSTOMER REVIEW</h1>
            <p>Trusted By Thousands, Loved Worldwide</p>
          </div>
          <div className="cardReviewWrp">
            <div className="carousel-btn-wrp">
              {/* NEW: onClick added on both arrows */}
              <div
                className="carousel-btn"
                onClick={() => slide(reviewRef, "prev")}
              >
                ←
              </div>
              <div
                className="carousel-btn"
                onClick={() => slide(reviewRef, "next")}
              >
                {" "}
                →
              </div>
            </div>
            {/* NEW: review-track holds the cards, the ref here lets the arrows slide them */}
            <div className="review-track" ref={reviewRef}>
              {/* one card is made for every item in the "reviews" list at the top */}
              {reviews.map((item) => (
                <div className="cardReview" key={item.id}>
                  <div className="review-stars">
                    {"★".repeat(item.rating)}
                    {"☆".repeat(5 - item.rating)}
                  </div>
                  <p className="review-text">{item.text}</p>
                  <div className="review-user">
                    <div className="review-avatar">{item.name.charAt(0)}</div>
                    <div className="review-info">
                      <h3>{item.name}</h3>
                      <span>
                        {item.product} • {item.city}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
        {loginPop && (
          <LoginCard cardName="cardName" onClose={() => setLoginPop(false)} />
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default HomePage;
