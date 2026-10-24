import "../css/myaccount.css";
import axios from "../../utils/axiosInstance";
import accountImg from "../assets/accImg.png";
import { useState, useEffect } from "react";
import {
  User,
  Package,
  Heart,
  LogOut,
  Clock,
  CircleCheck,
  PackageCheck,
  Truck,
  MapPin,
  Lock,
  PencilLine,
  Trash2,
  Plus,
} from "lucide-react";
import { AuthContext } from "../../Context/userContext";
import { useContext } from "react";

const MyAccountPage = () => {
  // state
  const [orders, setOrder] = useState();
  const [active, setActive] = useState("ACC");
  const [account, setAccount] = useState("profile");
  const [orderFilter, setOrderFilter] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  // state
  const { user } = useContext(AuthContext);
  console.log(wishlist);

  const orderFilters = ["All", "Pending", "Confirmed", "Shipped", "Delivered"];

  const getOrder = async () => {
    try {
      const res = await axios.get("/order");
      setOrder(res.data.order);
    } catch (error) {
      console.log(error);
    }
  };

  const getWishlist = async () => {
    try {
      const res = await axios.get("/wishlist");
      setWishlist(res.data.wishlist || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getAddresses = async () => {
    try {
      const res = await axios.get("/address");
      setAddresses(res.data.addresses || []);
    } catch (error) {
      console.log(error);
    }
  };

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    if (!profile.name || !profile.email || !profile.phone) {
      showMessage("Please fill all the fields");
      return;
    }
    try {
      await axios.put("/user/profile", profile);
      setIsEdit(false);
      showMessage("Profile updated successfully");
    } catch (error) {
      console.log(error);
      showMessage("Could not update profile");
    }
  };

  const handleAddressChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  const saveAddress = async () => {
    const empty = Object.values(addressForm).some((val) => !val);
    if (empty) {
      showMessage("Please fill all the address fields");
      return;
    }
    try {
      await axios.post("/address", addressForm);
      setAddressForm({
        fullName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
      });
      setShowAddressForm(false);
      getAddresses();
      showMessage("Address saved");
    } catch (error) {
      console.log(error);
      showMessage("Could not save address");
    }
  };

  const deleteAddress = async (id) => {
    try {
      await axios.delete(`/address/${id}`);
      setAddresses(addresses.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const changePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    if (!currentPassword || !newPassword || !confirmPassword) {
      showMessage("Please fill all the fields");
      return;
    }
    if (newPassword.length < 6) {
      showMessage("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      showMessage("Passwords do not match");
      return;
    }
    try {
      await axios.put("/user/change-password", {
        currentPassword,
        newPassword,
      });
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      showMessage("Password changed successfully");
    } catch (error) {
      console.log(error);
      showMessage("Could not change password");
    }
  };

  const removeWishlist = async (id) => {
    try {
      await axios.delete(`/wishlist/${id}`);
      getWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // step of the order in the track line
  const getStep = (status) => {
    if (status == "Delivered") return 3;
    if (status == "Shipped") return 2;
    if (status == "Confirmed") return 1;
    return 0;
  };

  useEffect(() => {
    getOrder();
    getWishlist();
    getAddresses();
  }, []);
  console.log(orders);

  useEffect(() => {
    setProfile({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
  }, [user]);

  const filteredOrders =
    orderFilter == "All"
      ? orders
      : orders?.filter((orderItem) => orderItem?.orderStatus == orderFilter);

  return (
    <>
      <div className="account-container">
        <div className="left-link-wrap--">
          <div
            className={active == "ACC" ? "link-wrap --active" : "link-wrap"}
            onClick={() => setActive("ACC")}
          >
            <User /> My Account
            <span>{"»"}</span>
          </div>
          <div
            className={active == "ORDER" ? "link-wrap --active" : "link-wrap"}
            onClick={() => setActive("ORDER")}
          >
            <Package /> My Order{" "}
            {active == "ORDER" ? (
              <span className="count-wrp">{orders?.length}</span>
            ) : (
              <span>{"»"}</span>
            )}
          </div>
          <div
            className={active == "WISH" ? "link-wrap --active" : "link-wrap"}
            onClick={() => setActive("WISH")}
          >
            <Heart /> Wishlist <span>{"»"}</span>
          </div>
          <div className="link-wrap" onClick={handleLogout}>
            <LogOut /> Log Out <span>{"»"}</span>
          </div>
          <div className="img-wrap-bottom">
            <img src={accountImg} alt="" />
          </div>
        </div>
        <div className="right-sec-wrap--">
          {message && <div className="toast-msg">{message}</div>}
          {active == "ACC" && (
            <>
              <div className="account-wrap">
                <div className="maintext-wrapp">
                  <h1>My Account</h1>
                  <p>
                    Manage your profile details, default delivery addresses, and
                    security preferences.
                  </p>
                </div>
                <div className="account-edit-wrap">
                  <div className="head-text-wrap">
                    <div
                      className={
                        account == "profile"
                          ? "head-main head-active"
                          : "head-main"
                      }
                      onClick={() => setAccount("profile")}
                    >
                      <User></User>Profile Information
                    </div>
                    <div
                      className={
                        account == "address"
                          ? "head-main head-active"
                          : "head-main"
                      }
                      onClick={() => setAccount("address")}
                    >
                      <MapPin />
                      Saved Addresses
                    </div>
                    <div
                      className={
                        account == "security"
                          ? "head-main head-active"
                          : "head-main"
                      }
                      onClick={() => setAccount("security")}
                    >
                      <Lock />
                      Security & Login
                    </div>
                  </div>
                  {account == "profile" && (
                    <>
                      <div className="acc--container-wrap">
                        <div className="acc-detail">
                          <div className="acc-img">{user?.name?.[0]}</div>
                          <span>
                            <h1>{user?.name}</h1>
                            <p>{user?.email}</p>
                          </span>
                          <button onClick={() => setIsEdit(!isEdit)}>
                            {isEdit ? "Cancel" : "Edit Profile"} <PencilLine />
                          </button>
                        </div>
                      </div>
                      <div className="detail-edit-wrap">
                        <input
                          type="text"
                          name="name"
                          placeholder="Name*"
                          value={profile.name}
                          onChange={handleProfileChange}
                          disabled={!isEdit}
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address*"
                          value={profile.email}
                          onChange={handleProfileChange}
                          disabled={!isEdit}
                        />
                        <input
                          type="text"
                          name="phone"
                          placeholder="Phone Number*"
                          value={profile.phone}
                          onChange={handleProfileChange}
                          disabled={!isEdit}
                        />
                        {isEdit && (
                          <button className="save-btn" onClick={saveProfile}>
                            Save Changes
                          </button>
                        )}
                      </div>
                    </>
                  )}
                  {account == "address" && (
                    <div className="address-wrap">
                      <div className="address-list">
                        {addresses?.length == 0 && !showAddressForm && (
                          <p className="empty-text">No saved addresses yet.</p>
                        )}
                        {addresses?.map((item) => (
                          <div className="address-card" key={item?._id}>
                            <MapPin className="icon-track" />
                            <div className="address-text">
                              <h2>{item?.fullName}</h2>
                              <p>{item?.street}</p>
                              <p>
                                {item?.city}, {item?.state} - {item?.pincode}
                              </p>
                              <p>{item?.phone}</p>
                            </div>
                            <button
                              className="icon-btn"
                              onClick={() => deleteAddress(item?._id)}
                            >
                              <Trash2 />
                            </button>
                          </div>
                        ))}
                      </div>
                      {showAddressForm ? (
                        <div className="detail-edit-wrap">
                          <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name*"
                            value={addressForm.fullName}
                            onChange={handleAddressChange}
                          />
                          <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number*"
                            value={addressForm.phone}
                            onChange={handleAddressChange}
                          />
                          <input
                            type="text"
                            name="street"
                            placeholder="Street Address*"
                            value={addressForm.street}
                            onChange={handleAddressChange}
                          />
                          <input
                            type="text"
                            name="city"
                            placeholder="City*"
                            value={addressForm.city}
                            onChange={handleAddressChange}
                          />
                          <input
                            type="text"
                            name="state"
                            placeholder="State*"
                            value={addressForm.state}
                            onChange={handleAddressChange}
                          />
                          <input
                            type="text"
                            name="pincode"
                            placeholder="Pincode*"
                            value={addressForm.pincode}
                            onChange={handleAddressChange}
                          />
                          <button className="save-btn" onClick={saveAddress}>
                            Save Address
                          </button>
                          <button
                            className="cancel-btn"
                            onClick={() => setShowAddressForm(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          className="save-btn add-address-btn"
                          onClick={() => setShowAddressForm(true)}
                        >
                          <Plus /> Add New Address
                        </button>
                      )}
                    </div>
                  )}
                  {account == "security" && (
                    <div className="detail-edit-wrap">
                      <input
                        type="password"
                        name="currentPassword"
                        placeholder="Current Password*"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                      />
                      <div></div>
                      <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password*"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                      />
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password*"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                      />
                      <button className="save-btn" onClick={changePassword}>
                        Update Password
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {active == "ORDER" && (
            <>
              <div className="order-wrapp">
                <div className="maintext-wrapp">
                  <h1>My Orders</h1>
                  <p>Here's a list of your recent orders.</p>
                  <div className="filter-wrap-order">
                    {orderFilters.map((filter) => (
                      <div
                        key={filter}
                        className={
                          orderFilter == filter
                            ? "item-filter --filter-active"
                            : "item-filter"
                        }
                        onClick={() => setOrderFilter(filter)}
                      >
                        {filter}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="order-list-wrap">
                  {filteredOrders?.length == 0 && (
                    <p className="empty-text">No orders found.</p>
                  )}
                  {filteredOrders?.map((orderItem) =>
                    orderItem?.items?.map((item) => (
                      <div className="order-item-card" key={item?._id}>
                        <div className="order-item-text-wrap">
                          <div className="img-order-item">
                            <img src={item?.productId?.images?.[0]} alt="" />
                          </div>
                          <div className="text-order---">
                            {" "}
                            <h2>#{orderItem?._id}</h2>
                            <p>{item?.productId?.title}</p>
                            <p>{item?.productId?.brand}</p>
                            <p>
                              <Package /> {item?.quantity} Item
                            </p>
                          </div>
                        </div>
                        <div className="status-order-wrap">
                          {orderItem?.orderStatus == "Pending" && (
                            <>
                              <span className="status-tag">
                                <Clock />
                                {orderItem?.orderStatus}
                              </span>
                              <p>
                                We're preparing your order. <br />
                                You'll get a notification once <br />
                                Placed it's shipped.
                              </p>
                            </>
                          )}
                          {orderItem?.orderStatus == "Confirmed" && (
                            <>
                              <span className="status-tag --confirmed">
                                <PackageCheck />
                                {orderItem?.orderStatus}
                              </span>
                              <p>
                                Your order is confirmed. <br />
                                We'll pack it and hand it <br />
                                over to the courier soon.
                              </p>
                            </>
                          )}
                          {orderItem?.orderStatus == "Shipped" && (
                            <>
                              <span className="status-tag --shipped">
                                <Truck />
                                {orderItem?.orderStatus}
                              </span>
                              <p>
                                Your order is on the way. <br />
                                Track the package for the <br />
                                latest delivery update.
                              </p>
                            </>
                          )}
                          {orderItem?.orderStatus == "Delivered" && (
                            <>
                              <span className="status-tag --delivered">
                                <CircleCheck />
                                {orderItem?.orderStatus}
                              </span>
                              <p>
                                Your order has been delivered. <br />
                                Thank you for shopping <br />
                                with us.
                              </p>
                            </>
                          )}
                        </div>
                        <div className="order-stutus-map">
                          <div className="status-tag">
                            <Package className="icon-track" /> Order Placed
                          </div>
                          <div
                            className={
                              getStep(orderItem?.orderStatus) >= 1
                                ? "line-track"
                                : "line-track --off"
                            }
                          ></div>
                          <div className="status-tag">
                            <PackageCheck
                              className={
                                getStep(orderItem?.orderStatus) >= 1
                                  ? "icon-track"
                                  : "icon-track --off"
                              }
                            />{" "}
                            Order Confirmed
                          </div>
                          <div
                            className={
                              getStep(orderItem?.orderStatus) >= 2
                                ? "line-track"
                                : "line-track --off"
                            }
                          ></div>
                          <div className="status-tag">
                            {" "}
                            <Truck
                              className={
                                getStep(orderItem?.orderStatus) >= 2
                                  ? "icon-track"
                                  : "icon-track --off"
                              }
                            />{" "}
                            Shipped
                          </div>
                          <div
                            className={
                              getStep(orderItem?.orderStatus) >= 3
                                ? "line-track"
                                : "line-track --off"
                            }
                          ></div>
                          <div className="status-tag">
                            <CircleCheck
                              className={
                                getStep(orderItem?.orderStatus) >= 3
                                  ? "icon-track"
                                  : "icon-track --off"
                              }
                            />{" "}
                            Delivered
                          </div>
                        </div>
                        <button className="trackpackage">
                          TRACK PACKAGE {">"}
                        </button>
                      </div>
                    )),
                  )}
                </div>
              </div>
            </>
          )}
          {active == "WISH" && (
            <>
              <div className="order-wrapp">
                <div className="maintext-wrapp">
                  <h1>My Wishlist</h1>
                  <p>Products you have saved for later.</p>
                </div>
                <div className="order-list-wrap">
                  {wishlist?.length == 0 && (
                    <p className="empty-text">Your wishlist is empty.</p>
                  )}
                  {wishlist?.map((wishItem) => (
                    <div className="order-item-card" key={wishItem?._id}>
                      <div className="order-item-text-wrap">
                        <div className="img-order-item">
                          <img src={wishItem?.productId?.images?.[0]} alt="" />
                        </div>
                        <div className="text-order---">
                          <h2>{wishItem?.productId?.title}</h2>
                          <p>{wishItem?.productId?.brand}</p>
                          <p>₹{wishItem?.productId?.price}</p>
                        </div>
                      </div>
                      <button
                        className="trackpackage"
                        onClick={() => removeWishlist(wishItem?._id)}
                      >
                        REMOVE
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MyAccountPage;
