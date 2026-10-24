import "../css/adminPage.css";
import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import {
  House,
  Package,
  Box,
  Users,
  ChartBarStacked,
  Settings,
  Bell,
  Search,
  PackageSearch,
  IndianRupee,
  X,
} from "lucide-react";
import { Table, Button } from "antd";
import logo from "../assets/Logo.png";

const AdminPage = () => {
  const [open, setOpen] = useState(false);
  const [allOrder, setOrders] = useState();
  const [users, setUsers] = useState();
  const [products, setProducts] = useState();
  console.log(products);

  // NEW: which sidebar section is showing
  const [active, setActive] = useState("Dashboard");
  // NEW: the order that was clicked with the Edit button
  const [selectedOrder, setSelectedOrder] = useState(null);
  // NEW: the value of the status dropdown
  const [newStatus, setNewStatus] = useState("Pending");

  // NEW: add product card
  const [addOpen, setAddOpen] = useState(false); // open / close the card
  const [productSizes, setProductSizes] = useState([]); // checked sizes
  const [productImages, setProductImages] = useState([]); // chosen image files
  const [inputKey, setInputKey] = useState(0); // used to clear the file input after saving
  // one object that holds everything typed in the form
  const [productForm, setProductForm] = useState({
    title: "",
    brand: "",
    category: "",
    gender: "Unisex",
    price: "",
    discountPrice: "",
    stock: "",
    shortDescription: "",
    description: "",
    features: "",
    images: "",
    frameColor: "",
    frameMaterial: "",
    frameShape: "",
    lensColor: "",
    lensMaterial: "",
    lensSize: "",
  });
  console.log(productForm);

  const orderGet = async () => {
    try {
      const res = await axios.get("allorders");
      setOrders(res.data.order || []);
    } catch (error) {
      console.log(error);
    }
  };

  const allUser = async () => {
    try {
      const res = await axios.get("users");
      setUsers(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const allProducts = async () => {
    try {
      const res = await axios.get("/products");
      setProducts(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };
  const totalRevenue = allOrder?.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0,
  );

  // NEW: runs when you click "Edit" on a row
  const handleEdit = (record) => {
    setSelectedOrder(record); // save the clicked order
    setNewStatus(record.orderStatus || "Pending"); // dropdown starts with its current status
    setOpen(true); // open the edit panel
  };

  // NEW: runs when you click the "Update" button
  const handleUpdate = async () => {
    try {
    } catch (error) {}
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Customer",
      dataIndex: ["address", "name"],
      key: "customer",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `₹${amount}`,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString("en-IN"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        // CHANGED: now sends the clicked row (record) to handleEdit
        <Button onClick={() => handleEdit(record)}>Edit</Button>
      ),
    },
  ];
  const dataSource = allOrder?.map((item) => ({
    _id: item._id,
    address: item.address,
    totalAmount: item.totalAmount,
    paymentMethod: item.paymentMethod,
    paymentStatus: item.paymentStatus,
    orderStatus: item.orderStatus,
    createdAt: item.createdAt,
  }));

  // NEW: runs every time you type in any form input
  // e.target.name is the input's name (like "title"), e.target.value is what you typed
  const handleProductChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  // NEW: runs when a size checkbox is clicked
  const handleSizeChange = (size) => {
    if (productSizes.includes(size)) {
      // already checked -> remove it
      setProductSizes(productSizes.filter((item) => item !== size));
    } else {
      // not checked -> add it
      setProductSizes([...productSizes, size]);
    }
  };

  // NEW: runs when you choose image files (max 4, same as your backend)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // turn the file list into a normal array
    setProductImages(files.slice(0, 4)); // keep only the first 4
  };

  // NEW: turns text with one item per line into an array
  const toList = (text) =>
    text
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item !== "");

  // NEW: runs when you click "Save Product"
  // runs when you click "Save Product"
  const handleAddProduct = async () => {
    // 1. Check the required fields
    if (
      !productForm.title ||
      !productForm.brand ||
      !productForm.category ||
      !productForm.price ||
      productSizes.length === 0
    ) {
      alert("Please fill Title, Brand, Category, Price and select a Size");
      return;
    }

    // 2. Work out the discount percentage, like "20%"
    let discountPercentage = "";
    if (productForm.discountPrice) {
      const percent =
        ((productForm.price - productForm.discountPrice) / productForm.price) *
        100;
      discountPercentage = Math.round(percent) + "%";
    }

    // 3. FormData is needed because we are sending image files
    const formData = new FormData();

    // 4. Add the required fields
    formData.append("title", productForm.title);
    formData.append("brand", productForm.brand);
    formData.append("category", productForm.category);
    formData.append("price", productForm.price);
    formData.append("gender", productForm.gender);

    // 5. Add the optional fields, but only the ones that were typed
    const optionalFields = [
      "discountPrice",
      "stock",
      "shortDescription",
      "frameColor",
      "frameMaterial",
      "frameShape",
      "lensColor",
      "lensMaterial",
      "lensSize",
    ];
    optionalFields.forEach((name) => {
      if (productForm[name]) {
        formData.append(name, productForm[name]);
      }
    });

    if (discountPercentage) {
      formData.append("discountPercentage", discountPercentage);
    }

    // 6. Add the lists: the same key is appended once per item
    productSizes.forEach((size) => formData.append("size", size));
    toList(productForm.description).forEach((item) =>
      formData.append("description", item),
    );
    toList(productForm.features).forEach((item) =>
      formData.append("features", item),
    );

    // 7. Add the images ("images" must match upload.array("images", 4) in the backend)
    productImages.forEach((file) => formData.append("images", file));

    // 8. Send to the backend
    try {
      await axios.post("/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      allProducts(); // reload the products table
      setAddOpen(false); // close the card
      setProductSizes([]); // clear sizes
      setProductImages([]); // clear images
      setInputKey(inputKey + 1); // clears the file input box

      // clear the form
      setProductForm({
        title: "",
        brand: "",
        category: "",
        gender: "Unisex",
        price: "",
        discountPrice: "",
        stock: "",
        shortDescription: "",
        description: "",
        features: "",
        images: "",
        frameColor: "",
        frameMaterial: "",
        frameShape: "",
        lensColor: "",
        lensMaterial: "",
        lensSize: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // NEW: columns for the Customers section
  // (change the dataIndex names to match your user fields)
  const userColumns = [
    { title: "User ID", dataIndex: "_id", key: "_id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  // NEW: columns for the Products section
  // (change the dataIndex names to match your product fields)
  const productColumns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "image",
      render: (images) =>
        images?.[0] ? (
          <img
            src={images[0]}
            alt="product"
            style={{
              width: 60,
              height: 60,
              objectFit: "cover",
              borderRadius: 6,
            }}
          />
        ) : (
          "-"
        ),
    },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Stock", dataIndex: "stock", key: "stock" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `₹${price}`,
    },
    {
      title: "Discount Price",
      dataIndex: "discountPrice",
      key: "discountPrice",
      render: (price) => (price ? `₹${price}` : "-"),
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (size) => size?.join(", "),
    },
  ];

  useEffect(() => {
    orderGet();
    allUser();
    allProducts();
  }, []);

  console.log(allOrder);
  console.log(totalRevenue);

  return (
    <>
      <div className="admin-container">
        <div className="sidebar">
          <div className="logo-wrapp--">
            <img src={logo} alt="" />
          </div>
          {/* NEW: onClick on every sidebar item changes "active" */}
          <div
            className={active === "Dashboard" ? "dash active" : "dash"}
            onClick={() => setActive("Dashboard")}
          >
            <House /> Dashboard
          </div>
          <div className="store">
            <label htmlFor="">STORE MANAGEMENT</label>
            <div
              className={active === "Orders" ? "store-box active" : "store-box"}
              onClick={() => setActive("Orders")}
            >
              <Package /> Orders
            </div>
            <div
              className={
                active === "Products" ? "store-box active" : "store-box"
              }
              onClick={() => setActive("Products")}
            >
              {" "}
              <Box />
              Products
            </div>
            <div
              className={
                active === "Customers" ? "store-box active" : "store-box"
              }
              onClick={() => setActive("Customers")}
            >
              <Users />
              Customers
            </div>
            <div
              className={
                active === "Categories" ? "store-box active" : "store-box"
              }
              onClick={() => setActive("Categories")}
            >
              <ChartBarStacked />
              Categories
            </div>
          </div>
          <div className="settings">
            <div
              className={
                active === "Settings" ? "store-box active" : "store-box"
              }
              onClick={() => setActive("Settings")}
            >
              {" "}
              <Settings />
              Settings
            </div>
          </div>
        </div>
        <div className="right-sec-wrap">
          <div className="top-bar--">
            <div className="search-wrapp--">
              <Search className="searchIcon" />{" "}
              <input
                type="search"
                name=""
                id=""
                placeholder="Search orders, products, customers ..."
              />
            </div>

            <div className="noti-acc">
              <Bell />
              <div className="acc-wrap-">
                <img
                  src="https://img.icons8.com/color/48/user-male-circle--v5.png"
                  alt=""
                />
                <div className="acc-main-wrap">Admin</div>
              </div>
            </div>
          </div>
          <div className="bottom-wrapp---">
            {/* ---------- DASHBOARD SECTION ---------- */}
            {active === "Dashboard" && (
              <div className="order-card-wrap">
                <div className="order-card">
                  {" "}
                  <span>
                    {" "}
                    <Package size={40} />
                    {allOrder?.length}
                  </span>
                  Total Orders
                </div>
                <div className="order-card">
                  {" "}
                  <span>
                    {" "}
                    <Users size={40} />
                    {users?.length}
                  </span>
                  Total Customers
                </div>
                <div className="order-card">
                  {" "}
                  <span>
                    {" "}
                    <PackageSearch size={40} />
                    {products?.length}
                  </span>
                  Total Orders
                </div>
                <div className="order-card">
                  {" "}
                  <span>
                    {" "}
                    <IndianRupee size={40} />
                    {totalRevenue}
                  </span>
                  Total Orders
                </div>
              </div>
            )}

            {/* ---------- ORDERS TABLE (shows in Dashboard and Orders) ---------- */}
            {(active === "Dashboard" || active === "Orders") && (
              <div className="main-bottom-wrap">
                <Table columns={columns} dataSource={dataSource} />
              </div>
            )}

            {/* ---------- ADD PRODUCT BUTTON (only in Products section) ---------- */}
            {active === "Products" && (
              <div className="add-btn-wrap">
                <Button type="primary" onClick={() => setAddOpen(true)}>
                  + Add Product
                </Button>
              </div>
            )}

            {/* ---------- PRODUCTS SECTION ---------- */}
            {active === "Products" && (
              <div className="main-bottom-wrap">
                <Table
                  columns={productColumns}
                  dataSource={products}
                  rowKey="_id"
                />
              </div>
            )}

            {/* ---------- ADD PRODUCT CARD ---------- */}
            <div className={addOpen ? "addbg openAdd" : "addbg"}>
              <div className="add-product-card">
                <div className="add-header">
                  <h2>Add Product</h2>
                  <X className="add-close" onClick={() => setAddOpen(false)} />
                </div>

                <div className="add-grid">
                  {/* ----- main details ----- */}
                  <div className="add-field full-width">
                    <label>Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={productForm.title}
                      onChange={handleProductChange}
                    />
                  </div>

                  <div className="add-field">
                    <label>Brand *</label>
                    <input
                      type="text"
                      name="brand"
                      value={productForm.brand}
                      onChange={handleProductChange}
                    />
                  </div>

                  <div className="add-field">
                    <label>Category *</label>
                    <input
                      type="text"
                      name="category"
                      value={productForm.category}
                      onChange={handleProductChange}
                    />
                  </div>

                  <div className="add-field">
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={productForm.gender}
                      onChange={handleProductChange}
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>

                  <div className="add-field">
                    <label>Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={productForm.stock}
                      onChange={handleProductChange}
                    />
                  </div>

                  {/* ----- sizes (checkboxes) ----- */}
                  <div className="add-field full-width">
                    <label>Size *</label>
                    <div className="size-row">
                      {["Small", "Medium", "Large", "Free-Size"].map((size) => (
                        <label key={size} className="size-box">
                          <input
                            type="checkbox"
                            checked={productSizes.includes(size)}
                            onChange={() => handleSizeChange(size)}
                          />
                          {size}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* ----- price ----- */}
                  <div className="add-field">
                    <label>Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={productForm.price}
                      onChange={handleProductChange}
                    />
                  </div>

                  <div className="add-field">
                    <label>Discount Price (₹)</label>
                    <input
                      type="number"
                      name="discountPrice"
                      value={productForm.discountPrice}
                      onChange={handleProductChange}
                    />
                  </div>

                  {/* ----- descriptions ----- */}
                  <div className="add-field full-width">
                    <label>Short Description</label>
                    <input
                      type="text"
                      name="shortDescription"
                      value={productForm.shortDescription}
                      onChange={handleProductChange}
                    />
                  </div>

                  <div className="add-field full-width">
                    <label>Description (one point per line)</label>
                    <textarea
                      rows="3"
                      name="description"
                      value={productForm.description}
                      onChange={handleProductChange}
                    ></textarea>
                  </div>

                  <div className="add-field full-width">
                    <label>Features (one feature per line)</label>
                    <textarea
                      rows="3"
                      name="features"
                      value={productForm.features}
                      onChange={handleProductChange}
                    ></textarea>
                  </div>

                  {/* ----- images ----- */}
                  <div className="add-field full-width">
                    <label>Images (max 4)</label>
                    <input
                      key={inputKey}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                    />
                    <span>{productImages.length} image(s) selected</span>
                  </div>

                  {/* ----- frame details ----- */}
                  <div className="add-field">
                    <label>Frame Color</label>
                    <input
                      type="text"
                      name="frameColor"
                      value={productForm.frameColor}
                      onChange={handleProductChange}
                    />
                  </div>

                  <div className="add-field">
                    <label>Frame Material</label>
                    <input
                      type="text"
                      name="frameMaterial"
                      value={productForm.frameMaterial}
                      onChange={handleProductChange}
                    />
                  </div>

                  <div className="add-field">
                    <label>Frame Shape</label>
                    <input
                      type="text"
                      name="frameShape"
                      value={productForm.frameShape}
                      onChange={handleProductChange}
                    />
                  </div>

                  {/* ----- lens details ----- */}
                  <div className="add-field">
                    <label>Lens Color</label>
                    <input
                      type="text"
                      name="lensColor"
                      value={productForm.lensColor}
                      onChange={handleProductChange}
                    />
                  </div>

                  <div className="add-field">
                    <label>Lens Material</label>
                    <input
                      type="text"
                      name="lensMaterial"
                      value={productForm.lensMaterial}
                      onChange={handleProductChange}
                    />
                  </div>

                  <div className="add-field">
                    <label>Lens Size</label>
                    <input
                      type="text"
                      name="lensSize"
                      value={productForm.lensSize}
                      onChange={handleProductChange}
                    />
                  </div>
                </div>

                <button className="save-product-btn" onClick={handleAddProduct}>
                  Save Product
                </button>
              </div>
            </div>

            {/* ---------- CUSTOMERS SECTION ---------- */}
            {active === "Customers" && (
              <div className="main-bottom-wrap">
                <Table columns={userColumns} dataSource={users} rowKey="_id" />
              </div>
            )}

            {/* ---------- CATEGORIES SECTION ---------- */}
            {active === "Categories" && (
              <div className="main-bottom-wrap">
                <h2>Categories</h2>
                <p>Code your categories section here.</p>
              </div>
            )}

            {/* ---------- SETTINGS SECTION ---------- */}
            {active === "Settings" && (
              <div className="main-bottom-wrap">
                <h2>Settings</h2>
                <p>Code your settings section here.</p>
              </div>
            )}

            {/* ---------- EDIT ORDER PANEL ---------- */}
            <div className={open ? "editbg openBg" : "editbg"}>
              <div className={open ? "edit-order openEdit" : "edit-order"}>
                <label htmlFor="">Update Status</label>
                <div className="dtail-wrapp">
                  {/* selectedOrder?. means: only read it if an order is selected */}
                  <span>Name: {selectedOrder?.address?.name}</span>
                  {/* change these address fields to match your address object */}
                  <span>
                    Address: {selectedOrder?.address?.street}{" "}
                    {selectedOrder?.address?.city}{" "}
                    {selectedOrder?.address?.pincode}
                  </span>
                  <span>Phone Number: {selectedOrder?.address?.phone}</span>
                  <span>Payment Method: {selectedOrder?.paymentMethod}</span>
                  <span>Total: ₹{selectedOrder?.totalAmount}</span>
                </div>
                <div className="update-status">
                  <label htmlFor="">Update </label>
                  <select
                    name=""
                    id=""
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <button className="update-btn" onClick={handleUpdate}>
                  Update
                </button>
                <div
                  className="close-btn-update"
                  onClick={() => setOpen(false)}
                >
                  <X />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
