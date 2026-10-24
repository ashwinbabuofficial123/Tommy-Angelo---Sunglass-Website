import "../css/productView.css";
import { Navigate, useParams } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import raybanlogo from "../assets/rayban-logo.png";
import raybanCover from "../assets/images/RaybanCover.png";
import frameVector from "../assets/framevector.png";
import { motion } from "motion/react";
import { AuthContext } from "../../Context/userContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import oakleyCover from "../assets/images/OakleyCover.png";
import ProductCard from "../components/product-card";
import { Star, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  ShoppingCartPlus,
  Truck,
  ShieldCheck,
  PackageCheck,
  BadgeCheck,
} from "lucide-react";
import { button, span } from "motion/react-client";
import Model3D from "../components/model3d";

import Footer from "../components/footer";

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const sizeChart = ["Small", "Medium", "Large", "Free-Size"];
  const [selectedSize, setSelectedSize] = useState("");
  const [toCart, setToCart] = useState({
    productId: "",
    quantity: 1,
    size: "",
  });
  console.log(selectedImage, "images");

  const productDetails = async () => {
    try {
      const res = await axios.get(`/product/${id}`);
      setProduct(res.data.product);
      setSelectedImage(res.data.product?.images?.[0] || "");
    } catch (error) {
      console.log(error);
    }
  };
  const onCartGet = async () => {
    try {
      const res = await axios.get("/cart");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const checkCart = async () => {
    try {
      const res = await axios.get("/cart");

      const cartData = res.data.cart;
      setCart(cartData);

      const productExists = cartData?.items?.some(
        (item) => item.productId?._id === product?._id,
      );

      setIsAddedToCart(productExists);
    } catch (error) {
      console.log(error);
    }
  };
  // wishlist
  const onWishlisht = async (e, productId) => {
    try {
      e.stopPropagation();
      const res = await axios.post("/wishlist", {
        userId: user?._id,
        productId,
      });
      console.log(res);
      toast(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const onAddToCart = async (productId) => {
    if (selectedSize) {
      try {
        const res = await axios.post("/cart", {
          userId: user?._id,
          items: [
            {
              productId: productId,
              size: selectedSize,
            },
          ],
          total: product?.discountPrice,
        });
        setIsAddedToCart(true);
        console.log(res);

        toast.success(res.data.message);
      } catch (error) {
        console.log(error);

        toast.error(error.response?.data?.message || "Something went wrong");
      }
    } else {
      toast.warning("Please select a size before adding to cart.");
    }
  };
  useEffect(() => {
    productDetails();
  }, []);

  useEffect(() => {
    if (product?._id) {
      checkCart();
    }
  }, [product]);
  // MOTION
  const animateContainer = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.5,
      },
    },
  };
  const animateBox = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };
  console.log(selectedSize, "selectedSize");
  console.log(product.discountPercentage, "product");

  return (
    <>
      <div className="product-container">
        <div className="product-cat">
          <span>HOME</span>►<span>{product?.category}</span>►
          <span>{product?.brand}</span>
        </div>
        <div className="product-view-wrap">
          <div className="productImage-wrp">
            <div
              className="quick-inter"
              onClick={(e) => onWishlisht(e, productItems?._id)}
            >
              <img
                src="https://img.icons8.com/hieroglyphs/32/like.png"
                alt=""
              />
            </div>
            <div className="img-wrp">
              <img src={selectedImage} alt="" />
            </div>
            <div className="image-slide-wrap">
              {product?.images?.map((item) => {
                return (
                  <div
                    className="slide-box"
                    onClick={() => setSelectedImage(item)}
                  >
                    <img src={item} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="product-details-wrap">
            <div className="title-main-wrap">
              {product?.brand == "Rayban" && (
                <img src={raybanlogo} style={{ width: "80px" }} />
              )}

              <h1>{product?.title}</h1>
              <div className="rating-wrp">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    style={{
                      color: "#000",
                      fill:
                        star <= Math.floor(product?.rating || 0)
                          ? "#000"
                          : "none",
                    }}
                  />
                ))}

                <span>{product?.rating || "Not rated"}</span>
              </div>
              <span>
                ₹ {product?.discountPrice}
                <span
                  style={{
                    textDecoration: "line-through",
                    fontSize: "18px",
                    color: "grey",
                  }}
                >
                  {" "}
                  {product?.price}
                </span>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    color: "#797777",
                  }}
                >
                  Include all Taxes
                </p>
                <div className="discount">
                  {product?.discountPercentage && (
                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#ff0000",
                      }}
                    >
                      {product?.discountPercentage} OFF
                    </span>
                  )}
                </div>
              </span>
            </div>
            <div className="price-and-buy-wrap">
              <div className="description">
                <h4 className="description-text">
                  {product?.shortDescription}
                </h4>{" "}
              </div>
              <div className="sizeChart">
                <h4>Available Sizes</h4>
                <div className="sizeWrp">
                  {product?.size?.map(
                    (sizes) =>
                      sizeChart.includes(sizes) && (
                        <span
                          key={sizes}
                          className={
                            selectedSize === sizes
                              ? "size-btn active"
                              : "size-btn"
                          }
                          onClick={() => setSelectedSize(sizes)}
                        >
                          {sizes}
                        </span>
                      ),
                  )}
                </div>
              </div>
              <div className="btn-wrap">
                {isAddedToCart ? (
                  <motion.button
                    className="btn"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 1, y: 0 }}
                    onClick={() => navigate("/cart")}
                  >
                    GO TO CART <ShoppingCart />
                  </motion.button>
                ) : (
                  <motion.button
                    className="btn"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 1, y: 0 }}
                    onClick={() => onAddToCart(product?._id)}
                  >
                    ADD TO CART <ShoppingCartPlus />
                  </motion.button>
                )}
                <button className="btn">
                  BUY NOW{" "}
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="overview-sec-wrap">
          <div className="service-card-wrap">
            <div className="ser-card">
              <Truck className="ser-svg" />
              <div className="text-ser-wrp">
                <p>FREE SHIPPING</p>
                <span>On all orders</span>
              </div>
            </div>
            <div className="ser-card">
              <ShieldCheck className="ser-svg" />
              <div className="text-ser-wrp">
                <p>2 YEARS WARRANTY</p>
                <span>On all sunglasses</span>
              </div>
            </div>
            <div className="ser-card">
              <PackageCheck className="ser-svg" />
              <div className="text-ser-wrp">
                <p>EASY RETURNS</p>
                <span>30-day return policy</span>
              </div>
            </div>
            <div className="ser-card">
              <BadgeCheck className="ser-svg" />
              <div className="text-ser-wrp">
                <p>100% AUTHENTIC</p>
                <span>Original products</span>
              </div>
            </div>
          </div>
          <motion.div
            className="details-wrap-sec"
            variants={animateContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="description-wrp" variants={animateBox}>
              <h3>Product Details</h3>{" "}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  marginTop: "30px",
                }}
              >
                {product?.description?.map((item) => (
                  <span className="des-listgap">
                    <img
                      src="https://img.icons8.com/material-outlined/checked--v1.png"
                      alt=""
                    />
                    {item}
                  </span>
                ))}
              </div>
              <div className="item-features">
                <div className="item-feat-box">
                  <img src={frameVector} alt="" />
                  <span>
                    <p>Frame Shape</p>
                    <p>{product?.frameShape}</p>
                  </span>
                </div>
                <div className="item-feat-box">
                  <img src={frameVector} alt="" />{" "}
                  <span>
                    <p>Frame Material</p>
                    <p>{product?.frameMaterial}</p>
                  </span>
                </div>
                <div className="item-feat-box">
                  <img src={frameVector} alt="" />{" "}
                  <span>
                    <p>Frame Color</p>
                    <p>{product?.frameColor}</p>
                  </span>
                </div>
                <div className="item-feat-box">
                  <img src={frameVector} alt="" />{" "}
                  <span>
                    <p>Lens Color</p>
                    <p>{product?.lensColor}</p>
                  </span>
                </div>
                <div className="item-feat-box">
                  <img src={frameVector} alt="" />{" "}
                  <span>
                    <p>Lens Material</p>
                    <p>{product?.lensMaterial}</p>
                  </span>
                </div>
                <div className="item-feat-box">
                  <img src={frameVector} alt="" />{" "}
                  <span>
                    <p>Lens Size</p>
                    <p>{product?.lensSize}</p>
                  </span>
                </div>
              </div>
            </motion.div>
            <motion.div className="coverImg" variants={animateBox}>
              {product?.brand === "Rayban" && (
                <img src={raybanCover} alt="Rayban Cover" />
              )}
              {product?.brand === "Oakley" && (
                <img src={oakleyCover} alt="Oakley Cover" />
              )}
            </motion.div>
          </motion.div>
          <motion.div
            className="model3d"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h1>SEE IT FROM EVERY ANGLE</h1>
            <p>
              Explore every curve, detail, and finish in an immersive 360° view.
            </p>
            <Model3D />
          </motion.div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProductView;
