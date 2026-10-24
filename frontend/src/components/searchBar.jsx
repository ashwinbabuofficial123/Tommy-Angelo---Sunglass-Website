import { useState } from "react";
import "../css/searchBar.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SearchBar = ({ searchOpen, setSearchOpen }) => {
  const data = useSelector((state) => state.product.products) || [];
  const [search, setSearch] = useState("");
  // REMOVED: const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const filteredProducts = data.filter(
    (item) =>
      item?.title?.toLowerCase().includes(search.toLowerCase()) ||
      item?.brand?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className={searchOpen ? "searchContainer open" : "searchContainer"}>
      <div className="searchBar">
        <label htmlFor="search">Search Products...</label>
        <div className="search-wrap">
          <input
            type="text"
            id="search"
            placeholder="Search...."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>→</button>
        </div>
        <div className="products-show">
          {!search.length ? (
            <label>Search Above</label>
          ) : (
            <>
              <label>Result..</label>
              {filteredProducts.map((item) => (
                <div
                  className="result-card"
                  key={item.id}
                  onClick={() => {
                    navigate(`/product/${item?._id || item.id}`);
                    setSearchOpen(false);
                  }}
                >
                  <img src={item?.images?.[0]} alt="" />
                  <p>{item.brand}</p>
                  <h1>{item.title}</h1>
                </div>
              ))}
            </>
          )}
        </div>
        <button
          className="close-btn-search"
          onClick={() => setSearchOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
