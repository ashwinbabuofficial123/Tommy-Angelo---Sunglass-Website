import "../css/cart.css";
import axios from "../../utils/axiosInstance";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import raybanlogo from "../assets/rayban-logo.png";
import { Table } from "antd";
import {
  Trash,
  ShoppingCart,
  Handbag,
  Shield,
  Undo2,
  Lock,
} from "lucide-react";
import { sub } from "motion/react-m";

const Cart = () => {
  const navigate = useNavigate();
  // USESTATES
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);
  const shippingCharge = 20;
  const TAX_PER_ITEM = 18;
  // USESTATES

  // FUNCTIONS
  const cartGet = async () => {
    try {
      const res = await axios.get("/cart");
      setCart(res.data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  const onQuantityUp = async (cartItem, item) => {
    if (item?.quantity >= 5) return;
    try {
      const newItems = cartItem.items.map((i) => ({
        productId: i.productId?._id,
        size: i.size,
        price: i.productId?.discountPrice ?? i.price,
        quantity: i._id === item._id ? i.quantity + 1 : i.quantity,
      }));
      const total = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const res = await axios.patch(`/cart/${cartItem?._id}`, {
        userId: user?._id,
        items: newItems,
        total: total,
      });
      console.log(res);
      cartGet();
    } catch (error) {
      console.log(error);
    }
  };
  const onQuantityDown = async (cartItem, item) => {
    if (item?.quantity <= 1) return;
    try {
      const newItems = cartItem.items.map((i) => ({
        _id: i._id,
        productId: i.productId?._id,
        size: i.size,
        price: i.productId?.discountPrice ?? i.price,
        quantity: i._id === item._id ? i.quantity - 1 : i.quantity,
      }));
      const total = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const res = await axios.patch(`/cart/${cartItem?._id}`, {
        userId: user?._id,
        items: newItems,
        total: total,
      });
      console.log(res);
      cartGet();
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteCart = async (cartId) => {
    try {
      const res = await axios.delete(`/cart/${cartId}`);
      console.log(res);
      cartGet();

      console.log(cartId);
    } catch (error) {
      console.log(error);
    }
  };

  const onCheckout = () => {
    try {
      navigate("/checkout", {
        state: { cartItems: allItems, total: grandTotal },
      });
    } catch (error) {}
  };
  // FUNCTIONS
  useEffect(() => {
    cartGet();
  }, []);

  console.log(cart);
  // Calculations
  const allItems = cart?.flatMap((item) => item?.items || []);

  const totalQuantity = allItems.reduce((sum, item) => sum + item.quantity, 0);

  const subTotal = allItems.reduce((sum, item) => {
    const price = item?.productId?.discountPrice ?? item?.price ?? 0;
    return sum + price * item?.quantity;
  }, 0);
  const shipping = allItems.length > 0 ? shippingCharge : 0;
  const taxes = totalQuantity * TAX_PER_ITEM;
  const grandTotal = subTotal + shipping + taxes;
  // Calculations

  console.log(allItems, totalQuantity, subTotal, shipping, taxes, grandTotal);
  return (
    <>
      <div className="cart-container">
        <div className="text-wrap-cart-main">
          <div className="page-location">
            <span>HOME</span> ➤<span>CART</span>
          </div>
          <div className="text-cart-wrp">
            <h1>YOUR CART ({cart?.length})</h1>
            <p>Review your items and proceed to secure checkout.</p>
          </div>
        </div>
        <div className="productwrp-checkout">
          <div className="cart-sect-wrap">
            <div className="title-wrp-cart">
              <div className="title-box title-box--product">
                <span>Product</span>
              </div>
              <div className="title-box">
                <span>Price</span>
              </div>
              <div className="title-box">
                <span>Quantity</span>
              </div>
              <div className="title-box">
                <span>Total</span>
              </div>
            </div>
            {cart?.map((cartItem) => {
              return cartItem?.items?.map((item) => {
                return (
                  <>
                    <div className="cartCheck" key={item?.id}>
                      <div className="delete-wrap">
                        <button onClick={() => onDeleteCart(cartItem?._id)}>
                          {" "}
                          <Trash />
                          REMOVE FROM CART
                        </button>
                      </div>
                      <div className="cartProduct-wrp">
                        {" "}
                        <div className="cartImg-wrp">
                          {" "}
                          <img src={item?.productId?.images?.[0]} alt="" />{" "}
                        </div>
                        <div className="cartText-wrp">
                          {" "}
                          {item?.productId?.brand?.toLowerCase() ==
                          "rayban".toLowerCase() ? (
                            <img
                              src={raybanlogo}
                              alt={""}
                              style={{ width: "40px" }}
                            />
                          ) : null}
                          <h2>{item?.productId?.title}</h2>
                          <p>Frame Shape : {item?.productId?.frameShape}</p>
                          <p>Lens Color : {item?.productId?.lensColor}</p>
                          <p>Size : {item?.size}</p>
                        </div>
                      </div>
                      <div className="price-wrp">
                        <span className="price---">
                          ₹ {item?.productId?.discountPrice}
                        </span>
                      </div>
                      <div className="quantity">
                        <button
                          className="btn-qty"
                          onClick={() => onQuantityDown(cartItem, item)}
                          disabled={item?.quantity <= 1}
                        >
                          -
                        </button>

                        <span>{item?.quantity}</span>
                        <button
                          className="btn-qty"
                          onClick={() => onQuantityUp(cartItem, item)}
                          disabled={item?.quantity >= 5}
                        >
                          +
                        </button>
                      </div>
                      <div className="total-wrap-cart">
                        <span className="price---">₹ {cartItem?.total}</span>
                      </div>
                    </div>
                  </>
                );
              });
            })}
            {cart?.length == 0 && (
              <div className="emptyCart">
                {" "}
                <ShoppingCart className="cartEmpty" /> Your Cart Is Empty
              </div>
            )}
          </div>
          <div className="checkout-wrap">
            <h1>ORDER SUMMARY</h1>
            <div className="total-sec-wrap">
              <div className="col-wrap">
                <span>Subtotal ({allItems?.length}) : </span>
                <span>₹ {subTotal}</span>
              </div>
              <div className="col-wrap">
                <span>Shipping Charges: </span>
                <span>₹ {shipping}</span>
              </div>
              <div className="col-wrap">
                <span>Estimated Taxes</span>
                <span>₹ {taxes}</span>
              </div>
            </div>
            <div className="col-wrap --total">
              <span>TOTAL</span>
              <span>₹ {grandTotal}</span>
            </div>
            <div
              className="checkout-btn-wrp"
              onClick={() => {
                onCheckout();
              }}
            >
              <button>
                <Handbag /> PROCEED TO CHECKOUT{" "}
              </button>
            </div>
            <div className="trust-build-wrap">
              <div className="trust-build-sec">
                <Lock />
                <span>
                  100% Secure Payments <br />
                  Your data is safe and encrypted
                </span>
              </div>
              <div className="trust-build-sec">
                {" "}
                <Undo2 />
                <span>
                  Easy Returns <br />
                  30-day return policy
                </span>
              </div>
              <div className="trust-build-sec">
                {" "}
                <Shield />
                <span>
                  Warranty
                  <br />2 years warranty on all sunglasses
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
