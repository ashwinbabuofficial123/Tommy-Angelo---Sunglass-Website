import "../css/checkouPage.css";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ClipLoader, RotateLoader } from "react-spinners";
import axios from "../../utils/axiosInstance";
import { motion } from "motion/react";
import { AuthContext } from "../../Context/userContext";

import { toast, ToastContainer } from "react-toastify";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, total } = location.state || {};
  const [returnPage, setReturn] = useState(false);
  const [payment, setPayment] = useState("");
  const { user } = useContext(AuthContext);
  console.log(cartItems, total);
  // USESTATE
  const [data, setData] = useState({
    name: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    mainAddress: "",
  });
  // USESTATE

  // STEP PROGRESS
  const isAddressFilled =
    !!data.name?.trim() &&
    !!data.phone?.trim() &&
    !!data.city?.trim() &&
    !!data.state &&
    !!data.country &&
    !!data.pincode?.trim() &&
    !!data.mainAddress?.trim();
  const isPaymentSelected = !!payment;
  // STEP PROGRESS

  // FUNCTIONS
  const onInputChange = (e) => {
    try {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    } catch (error) {
      console.log(error);
    }
  };

  const onPayment = (e) => {
    try {
      setPayment(e.target.value);
    } catch (error) {}
  };

  const onOrderClick = async () => {
    // validation
    const { name, phone, city, state, country, pincode, mainAddress } = data;
    if (
      !name ||
      !phone ||
      !city ||
      !state ||
      !country ||
      !pincode ||
      !mainAddress
    ) {
      return toast("Complete Your Shipping Address");
    }
    if (!payment) {
      return toast("Select a Payment Method");
    }
    const paymentStatus = payment !== "COD" ? "Paid" : "Pending";
    try {
      const res = await axios.post("/order", {
        items: cartItems.map((item) => ({
          productId: item.productId._id, // only the id
          quantity: item.quantity,
          price: item.productId.price, // or item.price, see note below
        })),
        totalAmount: total,
        address: data,
        paymentMethod: payment,
        paymentStatus: paymentStatus,
      });
      console.log(res);

      toast.success("Order Placed"); // or an order success page
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Could not place order");
    }
  };

  // FUNCTIONS

  useEffect(() => {
    if (!cartItems && !total) {
      setReturn(true);

      const timer = setTimeout(() => {
        navigate("/cart");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);
  useEffect(() => {}, []);
  console.log(data);
  console.log(payment);

  return (
    <>
      {returnPage && (
        <div className="returnPage">
          <div className="loading-wrp">
            <ClipLoader color="#36d7b7" />
          </div>
          <h1>OOPS , REDIRECTING TO CARTPAGE</h1>
        </div>
      )}
      {cartItems && total && (
        <div className="checkout-container">
          <div className="top-text-wrap">
            <div className="navigate-route">HOME ➤ CART ➤ CHECKOUT</div>
            <div className="main-checkout-wrap">
              <h1>CHECKOUT</h1>
              <p>Complete your details below to place your order.</p>
            </div>
          </div>
          {cartItems && total && (
            <div className="checkout-section-wrap">
              <div className="checkout-form-fill">
                <div className="checkout-map">
                  <div className="check-status active">1</div>
                  <div className="line active"></div>
                  <div
                    className={`check-status ${isAddressFilled ? "active" : ""}`}
                  >
                    2
                  </div>
                  <div
                    className={`line ${isAddressFilled ? "active" : ""}`}
                  ></div>
                  <div
                    className={`check-status ${
                      isAddressFilled && isPaymentSelected ? "active" : ""
                    }`}
                  >
                    3
                  </div>
                </div>
                <div className="checkout-forms">
                  <div className="label-wrap">
                    <label htmlFor="">1. SHIPPING ADDRESS</label>
                  </div>
                  <div className="form-wrap-main">
                    <input
                      type="text"
                      name="name"
                      id=""
                      placeholder="*First Name"
                      onChange={onInputChange}
                    />

                    <input
                      type="email"
                      name="email"
                      id=""
                      placeholder="*Email Address"
                      onChange={onInputChange}
                    />
                    <input
                      type="text"
                      name="phone"
                      id=""
                      placeholder="*Phone Number"
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="addres-form">
                    <textarea
                      name="mainAddress"
                      id=""
                      placeholder="*Address Line 1"
                      onChange={onInputChange}
                    ></textarea>
                    <textarea
                      name="mainAddress"
                      id=""
                      placeholder="*Address Line 2 (Optional)"
                      onChange={onInputChange}
                    ></textarea>
                  </div>
                  <div className="state-wrap">
                    <select
                      id="country"
                      name="country"
                      onChange={onInputChange}
                    >
                      <option value="">*Country/Region</option>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Italy">Italy</option>
                      <option value="Spain">Spain</option>
                      <option value="Japan">Japan</option>
                      <option value="China">China</option>
                      <option value="Singapore">Singapore</option>
                      <option value="United Arab Emirates">
                        United Arab Emirates
                      </option>
                    </select>
                    <select id="state" name="state" onChange={onInputChange}>
                      <option value="">*State</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Delhi">Delhi</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Haryana">Haryana</option>
                    </select>
                    <input
                      type="text"
                      name="city"
                      id=""
                      placeholder="*City"
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="pincode-wrap">
                    <input
                      type="text"
                      name="pincode"
                      id=""
                      placeholder="*Pincode"
                      onChange={onInputChange}
                    />
                    <span>
                      <input type="checkbox" name="" id="" />
                      <p>Save this information for next time</p>
                    </span>
                  </div>
                  <div className="paymentMethod">
                    <label htmlFor="">
                      2. PAYMENT METHOD
                      <p>All transactions are secure and encrypted.</p>
                    </label>
                    <div className="payment-wrap">
                      <div className="payment-wrap-card">
                        <input
                          type="radio"
                          name="paymentMethod"
                          id=""
                          value="CreditCard"
                          onChange={onPayment}
                        />
                        <span>
                          <img
                            src="https://img.icons8.com/?size=50&id=22128&format=png&color=000000"
                            alt=""
                            className="paymentIcon"
                          />
                          Credit Card/Debit Card
                        </span>
                      </div>
                      {payment === "CreditCard" ? (
                        <div className="credit-card-wrap">
                          <div className="card--ui">
                            <div className="chip-wrap">
                              <img
                                src="https://img.icons8.com/?size=50&id=30435&format=png&color=000000"
                                alt=""
                              />
                              <img
                                src="https://img.icons8.com/?size=50&id=85573&format=png&color=000000"
                                alt=""
                                className="wifi-tap"
                              />
                            </div>
                            <div className="input-wrap-card">
                              <input
                                type="text"
                                name=""
                                id=""
                                placeholder="1234 4568 1234 4568"
                              />
                              <span>
                                <p>VALID FROM</p>
                                <input
                                  type="text"
                                  name=""
                                  id=""
                                  placeholder="1/23"
                                />
                                <p>VALID THRU</p>
                                <input
                                  type="text"
                                  name=""
                                  id=""
                                  placeholder="1/26"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : null}
                      <div className="payment-wrap-card">
                        {" "}
                        <input
                          type="radio"
                          name="paymentMethod"
                          id=""
                          value="Online"
                          onChange={onPayment}
                        />
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1896 401"
                            id="razorpay"
                            className="paymentIcon"
                          >
                            <path
                              fill="#3395FF"
                              d="m122.63 105.7-15.75 57.97 90.15-58.3-58.96 219.98 59.88.05L285.05.48"
                            ></path>
                            <path
                              d="M25.6 232.92.8 325.4h122.73l50.22-188.13L25.6 232.92m426.32-81.42c-3 11.15-8.78 19.34-17.4 24.57-8.6 5.22-20.67 7.84-36.25 7.84h-49.5l17.38-64.8h49.5c15.56 0 26.25 2.6 32.05 7.9 5.8 5.3 7.2 13.4 4.22 24.6m51.25-1.4c6.3-23.4 3.7-41.4-7.82-54-11.5-12.5-31.68-18.8-60.48-18.8H324.4l-66.5 248.1h53.67l26.8-100h35.2c7.9 0 14.12 1.3 18.66 3.8 4.55 2.6 7.22 7.1 8.04 13.6l9.58 82.6h57.5l-9.32-77c-1.9-17.2-9.77-27.3-23.6-30.3 17.63-5.1 32.4-13.6 44.3-25.4a92.6 92.6 0 0 0 24.44-42.5m130.46 86.4c-4.5 16.8-11.4 29.5-20.73 38.4-9.34 8.9-20.5 13.3-33.52 13.3-13.26 0-22.25-4.3-27-13-4.76-8.7-4.92-21.3-.5-37.8 4.42-16.5 11.47-29.4 21.17-38.7 9.7-9.3 21.04-13.95 34.06-13.95 13 0 21.9 4.5 26.4 13.43 4.6 8.97 4.7 21.8.2 38.5zm23.52-87.8-6.72 25.1c-2.9-9-8.53-16.2-16.85-21.6-8.34-5.3-18.66-8-30.97-8-15.1 0-29.6 3.9-43.5 11.7-13.9 7.8-26.1 18.8-36.5 33-10.4 14.2-18 30.3-22.9 48.4-4.8 18.2-5.8 34.1-2.9 47.9 3 13.9 9.3 24.5 19 31.9 9.8 7.5 22.3 11.2 37.6 11.2a82.4 82.4 0 0 0 35.2-7.7 82.11 82.11 0 0 0 28.4-21.2l-7 26.16h51.9L709.3 149h-52zm238.65 0H744.87l-10.55 39.4h87.82l-116.1 100.3-9.92 37h155.8l10.55-39.4h-94.1l117.88-101.8m142.4 52c-4.67 17.4-11.6 30.48-20.75 39-9.15 8.6-20.23 12.9-33.24 12.9-27.2 0-36.14-17.3-26.86-51.9 4.6-17.2 11.56-30.13 20.86-38.84 9.3-8.74 20.57-13.1 33.82-13.1 13 0 21.78 4.33 26.3 13.05 4.52 8.7 4.48 21.67-.13 38.87m30.38-80.83c-11.95-7.44-27.2-11.16-45.8-11.16-18.83 0-36.26 3.7-52.3 11.1a113.09 113.09 0 0 0-41 32.06c-11.3 13.9-19.43 30.2-24.42 48.8-4.9 18.53-5.5 34.8-1.7 48.73 3.8 13.9 11.8 24.6 23.8 32 12.1 7.46 27.5 11.17 46.4 11.17 18.6 0 35.9-3.74 51.8-11.18 15.9-7.48 29.5-18.1 40.8-32.1 11.3-13.94 19.4-30.2 24.4-48.8 5-18.6 5.6-34.84 1.8-48.8-3.8-13.9-11.7-24.6-23.6-32.05m185.1 40.8 13.3-48.1c-4.5-2.3-10.4-3.5-17.8-3.5-11.9 0-23.3 2.94-34.3 8.9-9.46 5.06-17.5 12.2-24.3 21.14l6.9-25.9-15.07.06h-37l-47.7 176.7h52.63l24.75-92.37c3.6-13.43 10.08-24 19.43-31.5 9.3-7.53 20.9-11.3 34.9-11.3 8.6 0 16.6 1.97 24.2 5.9m146.5 41.1c-4.5 16.5-11.3 29.1-20.6 37.8-9.3 8.74-20.5 13.1-33.5 13.1s-21.9-4.4-26.6-13.2c-4.8-8.85-4.9-21.6-.4-38.36 4.5-16.75 11.4-29.6 20.9-38.5 9.5-8.97 20.7-13.45 33.7-13.45 12.8 0 21.4 4.6 26 13.9 4.6 9.3 4.7 22.2.28 38.7m36.8-81.4c-9.75-7.8-22.2-11.7-37.3-11.7-13.23 0-25.84 3-37.8 9.06-11.95 6.05-21.65 14.3-29.1 24.74l.18-1.2 8.83-28.1h-51.4l-13.1 48.9-.4 1.7-54 201.44h52.7l27.2-101.4c2.7 9.02 8.2 16.1 16.6 21.22 8.4 5.1 18.77 7.63 31.1 7.63 15.3 0 29.9-3.7 43.75-11.1 13.9-7.42 25.9-18.1 36.1-31.9 10.2-13.8 17.77-29.8 22.6-47.9 4.9-18.13 5.9-34.3 3.1-48.45-2.85-14.17-9.16-25.14-18.9-32.9m174.65 80.65c-4.5 16.7-11.4 29.5-20.7 38.3-9.3 8.86-20.5 13.27-33.5 13.27-13.3 0-22.3-4.3-27-13-4.8-8.7-4.9-21.3-.5-37.8 4.4-16.5 11.42-29.4 21.12-38.7 9.7-9.3 21.05-13.94 34.07-13.94 13 0 21.8 4.5 26.4 13.4 4.6 8.93 4.63 21.76.15 38.5zm23.5-87.85-6.73 25.1c-2.9-9.05-8.5-16.25-16.8-21.6-8.4-5.34-18.7-8-31-8-15.1 0-29.68 3.9-43.6 11.7-13.9 7.8-26.1 18.74-36.5 32.9-10.4 14.16-18 30.3-22.9 48.4-4.85 18.17-5.8 34.1-2.9 47.96 2.93 13.8 9.24 24.46 19 31.9 9.74 7.4 22.3 11.14 37.6 11.14 12.3 0 24.05-2.56 35.2-7.7a82.3 82.3 0 0 0 28.33-21.23l-7 26.18h51.9l47.38-176.7h-51.9zm269.87.06.03-.05h-31.9c-1.02 0-1.92.05-2.85.07h-16.55l-8.5 11.8-2.1 2.8-.9 1.4-67.25 93.68-13.9-109.7h-55.08l27.9 166.7-61.6 85.3h54.9l14.9-21.13c.42-.62.8-1.14 1.3-1.8l17.4-24.7.5-.7 77.93-110.5 65.7-93 .1-.06h-.03z"
                              fill="#072654"
                            ></path>
                          </svg>
                          Razor Pay
                        </span>
                      </div>
                      <div className="payment-wrap-card">
                        {" "}
                        <input
                          type="radio"
                          name="paymentMethod"
                          id=""
                          value="Online"
                          onChange={onPayment}
                        />
                        <span>
                          <img
                            src="https://img.icons8.com/?size=50&id=112309&format=png&color=000000"
                            alt=""
                            className="paymentIcon"
                          />
                          UPI
                        </span>
                      </div>
                      <div className="payment-wrap-card">
                        {" "}
                        <input
                          type="radio"
                          name="paymentMethod"
                          id=""
                          value="COD"
                          onChange={onPayment}
                        />
                        <span>
                          <img
                            src="https://img.icons8.com/?size=50&id=76949&format=png&color=000000"
                            alt=""
                            className="paymentIcon"
                          />
                          COD (Cash On Delivery)
                        </span>
                      </div>
                    </div>
                    <button
                      className="placeorder--"
                      onClick={() => onOrderClick()}
                    >
                      PLACE ORDER →
                    </button>
                  </div>
                </div>
              </div>

              <div className="order-summery-checkout">
                <label htmlFor="">CHECKOUT SUMMARY</label>
                <div className="cartItems">
                  {cartItems?.map((item) => {
                    return (
                      <>
                        <div className="cart-wrap-check">
                          <div className="img-wrap-check">
                            <img src={item?.productId?.images?.[0]} alt="" />
                          </div>
                          <div className="text--wrap-check--">
                            <h1>{item?.productId?.title}</h1>
                            <p>{item?.productId?.brand}</p>
                            <p>{item?.size}</p>
                            <p>Qty: {item?.quantity}</p>
                          </div>
                          <span>₹ {item?.productId?.price}</span>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="total-grand">
                  <span>GRAND TOTAL</span>
                  <span>₹ {total}</span>
                </div>
              </div>
            </div>
          )}
          {!cartItems && !total && (
            <div className="check-cart">
              <img
                src="https://img.icons8.com/?size=100&id=GEzVRrQsGeiJ&format=png&color=2b2b2b"
                alt=""
              />
              Oops! <br />
              You Have no Product to Checkout
            </div>
          )}

          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
