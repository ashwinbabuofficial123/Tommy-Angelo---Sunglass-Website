require("./DB");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const PORT = process.env.PORT;
const userRoutes = require("./Routes/userRoutes");
const authRoute = require("./Routes/authRoute");
const addressRoute = require("./Routes/addressRoute");
const productRoute = require("./Routes/productRoute");
const cartRoute = require("./Routes/cartRoute");
const orderRoute = require("./Routes/orderRoute");
const wishlistRoute = require("./Routes/wishlistRoute");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(authRoute);
app.use(userRoutes);
app.use(addressRoute);
app.use(productRoute);
app.use(cartRoute);
app.use(orderRoute);
app.use(wishlistRoute);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
