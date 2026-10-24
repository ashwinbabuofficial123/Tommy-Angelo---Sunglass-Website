import "../css/productsPage.css";
import productBg from "../assets/productBg.png";
import Filter from "../components/filter";
import ProductCard from "../components/product-card";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    gender: [],
    size: [],
    frameShape: [],
    frameMaterial: [],
    lensColor: [],
    minPrice: "",
    maxPrice: "",
  });
  console.log(filters);

  return (
    <>
      <div className="products-container">
        <div className="top-hero-wrap--">
          <img src={productBg} alt="" />
          <div className="-top-text-wrap">
            <span>SHOP COLLECTIONS</span>
            <h1>SUNGLASSES</h1>
            <p>Timeless Styles. Iconic Looks. Find your Perfect Pair.</p>
          </div>
        </div>
        <div className="page-path">HOME {">"} PRODUCTS</div>
        <div className="filter-and-products">
          <Filter filters={filters} setFilters={setFilters} />
          <div className="products-wrapp--">
            <ProductCard filters={filters} type="allProducts" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
