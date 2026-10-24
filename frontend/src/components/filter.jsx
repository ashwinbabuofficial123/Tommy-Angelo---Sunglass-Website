import "../css/filter.css";
import { useState } from "react";

const Filter = ({ filters, setFilters }) => {
  const [open, setOpen] = useState(false);

  const onInputChange = (e) => {
    const { name, value, checked } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value] // checked → add
        : prev[name].filter((v) => v !== value), // unchecked → remove
    }));
  };

  const onPriceChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="filter-container">
        <label htmlFor="" className="filterHead">
          Filter
        </label>
        <button className="filterBtn" onClick={() => setOpen(!open)}>
          Filter
        </button>
        <div className={open ? "filter-selects open" : "filter-selects"}>
          <div className="filter-sec-wraps">
            <label htmlFor="">Category</label>
            <div className="inpt-wrap-filter">
              {" "}
              <span>
                <input
                  type="checkbox"
                  name="category"
                  id=""
                  value="Sunglass"
                  onChange={onInputChange}
                />
                Sunglasses
              </span>
              <span>
                <input
                  type="checkbox"
                  name="category"
                  id=""
                  value="Eyewear"
                  onChange={onInputChange}
                />
                Eyewears
              </span>
            </div>
          </div>
          <div className="filter-sec-wraps">
            <label htmlFor="">Brand</label>
            <div className="inpt-wrap-filter">
              <span>
                <input
                  type="checkbox"
                  name="brand"
                  value="Rayban"
                  id=""
                  onChange={onInputChange}
                />
                Rayban
              </span>
              <span>
                <input
                  type="checkbox"
                  name="brand"
                  value="oakley"
                  id=""
                  onChange={onInputChange}
                />
                Oakley
              </span>
              <span>
                <input
                  type="checkbox"
                  name="brand"
                  value="Gucci"
                  id=""
                  onChange={onInputChange}
                />
                Gucci
              </span>
              <span>
                <input
                  type="checkbox"
                  name="brand"
                  value="Tommy Angelo"
                  id=""
                  onChange={onInputChange}
                />
                Tommy Angelo
              </span>
            </div>
          </div>
          <div className="filter-sec-wraps">
            <label htmlFor="">Gender</label>
            <div className="inpt-wrap-filter">
              <span>
                <input
                  type="checkbox"
                  name="gender"
                  id=""
                  value="Men"
                  onChange={onInputChange}
                />
                Men
              </span>
              <span>
                <input
                  type="checkbox"
                  name="gender"
                  id=""
                  value="Women"
                  onChange={onInputChange}
                />
                Women
              </span>
              <span>
                <input
                  type="checkbox"
                  name="gender"
                  value="Unisex"
                  id=""
                  onChange={onInputChange}
                />
                Unisex
              </span>
            </div>
          </div>
          <div className="filter-sec-wraps">
            <label htmlFor="">Size</label>
            <div className="inpt-wrap-filter">
              <span>
                <input
                  type="checkbox"
                  name="size"
                  value="Small"
                  id=""
                  onChange={onInputChange}
                />
                Small
              </span>
              <span>
                <input
                  type="checkbox"
                  name="size"
                  value="Medium"
                  id=""
                  onChange={onInputChange}
                />
                Medium
              </span>
              <span>
                <input
                  type="checkbox"
                  name="size"
                  value="Free-Size"
                  id=""
                  onChange={onInputChange}
                />
                Free-Size
              </span>
            </div>
          </div>
          <div className="filter-sec-wraps">
            <label htmlFor="">Frame Shape</label>
            <div className="inpt-wrap-filter">
              <span>
                <input
                  type="checkbox"
                  name="frameShape"
                  value="Wayfarer"
                  id=""
                  onChange={onInputChange}
                />
                Wayfarer
              </span>
              <span>
                <input
                  type="checkbox"
                  name="frameShape"
                  value="Aviator"
                  id=""
                  onChange={onInputChange}
                />
                Aviator
              </span>
              <span>
                <input
                  type="checkbox"
                  name="frameShape"
                  value="Oval"
                  id=""
                  onChange={onInputChange}
                />
                Oval
              </span>
            </div>
          </div>

          <div className="filter-sec-wraps">
            <label htmlFor="">Lens Color</label>
            <div className="inpt-wrap-filter">
              <span>
                <input
                  type="checkbox"
                  name="lensColor"
                  value="Red"
                  id=""
                  onChange={onInputChange}
                />
                Red
              </span>
              <span>
                <input
                  type="checkbox"
                  name="lensColor"
                  value="Green"
                  id=""
                  onChange={onInputChange}
                />
                Green
              </span>
              <span>
                <input
                  type="checkbox"
                  name="lensColor"
                  value="Blue"
                  id=""
                  onChange={onInputChange}
                />
                Blue
              </span>
              <span>
                <input
                  type="checkbox"
                  name="lensColor"
                  value="Black"
                  id=""
                  onChange={onInputChange}
                />
                Black
              </span>
            </div>
          </div>
          <div className="filter-sec-wraps">
            <label htmlFor="">Price</label>
            <div className="inpt-wrap-filter">
              <input
                type="text"
                name="minPrice"
                id=""
                placeholder="Min"
                value={filters.minPrice}
                onChange={onPriceChange}
              />{" "}
              <input
                type="text"
                name="maxPrice"
                id=""
                placeholder="Max"
                value={filters.maxPrice}
                onChange={onPriceChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
