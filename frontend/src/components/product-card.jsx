import "../css/productCard.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { AuthContext } from "../../Context/userContext";
import { useContext } from "react";
import raybanLogo from "../assets/rayban-logo.png";
import { toast, ToastContainer } from "react-toastify";
import {
  setProducts,
  setNewProducts,
  setBestseller,
  setSuggested,
} from "../../Toolkit/slices/productSlice";
import axios from "../../utils/axiosInstance";

const ProductCard = ({ type, filters }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [wish, setWish] = useState([]);
  const { user } = useContext(AuthContext);
  const data = useSelector((state) => state.product);
  console.log(data);

  const getProducts = async () => {
    try {
      const res = await axios.get("/products", {
        params: filters,
        paramsSerializer: { indexes: null }, // brand=Rayban&brand=Gucci
      });
      dispatch(setProducts(res.data.product));
      dispatch(setNewProducts(res.data.product));
      dispatch(setBestseller(res.data.product));
      dispatch(setSuggested(res.data.product));
    } catch (error) {
      console.log(error);
    }
  };
  const onWishlistToggle = async (e, productId) => {
    e.stopPropagation();

    const isWished = wish.includes(productId);

    try {
      if (isWished) {
        await axios.delete(`/wishlist/${productId}`);
        setWish((prev) => prev.filter((id) => id !== productId));
        toast("Removed From Wishlist");
      } else {
        await axios.post("/wishlist", {
          userId: user?._id,
          productId: productId,
        });
        setWish((prev) => [...prev, productId]);
        toast("Added To Wishlist");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onWishlistGet = async () => {
    try {
      const res = await axios.get("/wishlist");
      setWish(
        res.data.wishlist?.map(
          (item) => item?.productId?._id || item?.productId || item?._id,
        ) || [],
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, [filters]);

  useEffect(() => {
    onWishlistGet();
  }, []);
  console.log(filters);

  return (
    <>
      {type == "allProducts" && (
        <>
          {data?.products?.map((item) => (
            <div
              className="product-card-wrp"
              onClick={() => navigate(`/product/${item?._id}`)}
            >
              <div className="quik-inter-wrap--">
                {" "}
                <div
                  className="quik-inter"
                  onClick={(e) => onWishlistToggle(e, item?._id)}
                >
                  <Heart
                    className={
                      wish.includes(item?._id) ? "wishlist filled" : "wishlist"
                    }
                  />{" "}
                </div>{" "}
              </div>
              <div className="img-wrap-prduct">
                <img src={item?.images?.[0]} alt="" />
              </div>
              <div className="text-wwrap--product">
                <div className="logo-wrap-pro">
                  {item?.brand.toLowerCase() == "rayban" && (
                    <img src={raybanLogo} alt="" />
                  )}
                </div>
                <h1>{item?.title}</h1>
                <div className="price-wrap---">
                  <span>₹{item?.discountPrice}</span>
                  <span>₹{item?.price}</span>
                </div>
                <div className="color-wrap">
                  {item?.lensColor?.toLowerCase() == "green" && (
                    <div className="colorBox green"></div>
                  )}
                  {item?.lensColor?.toLowerCase() == "black" && (
                    <div className="colorBox black"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default ProductCard;
