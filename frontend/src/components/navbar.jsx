import "../css/navbar.css";
import logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "./searchBar";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // ADDED
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const lastScrolledY = useRef(0);
  const token = localStorage.getItem("token");
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     if (currentScrollY > lastScrolledY.current && currentScrollY > 20) {
  //       setScrolled(true);
  //     } else {
  //       setScrolled(false);
  //     }
  //     lastScrolledY.current = currentScrollY;
  //   };
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // });
  const handleBrandsClick = (e) => {
    e.preventDefault();
    setOpen(false); // closes the mobile menu
    if (location.pathname === "/") {
      document.getElementById("brands")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: "brands" } });
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // ADDED []
  console.log(lastScrolledY);

  return (
    <>
      <nav className={scrolled ? "navbar scrollNav" : "navbar"}>
        <div className="ham" onClick={() => setOpen(!open)}>
          <div className="ham-line"></div>
          <div className="ham-line"></div>
          <div className="ham-line"></div>
        </div>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
        </div>
        <div className={open ? "navLinks nav-links" : "navLinks"}>
          <Link className="links" onClick={() => navigate("/products")}>
            EYEWEAR
          </Link>
          <Link className="links" onClick={() => navigate("/products")}>
            SUNGLASSES
          </Link>
          <Link className="links" to="/" onClick={handleBrandsClick}>
            BRANDS
          </Link>
          <Link className="links">ABOUT US</Link>
        </div>
        <div className="functional-links">
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              setSearchOpen(!searchOpen);
            }}
          >
            <img
              src="https://img.icons8.com/?size=32&id=elSdeHsB03U3&format=png&color=FFFFFF"
              alt=""
              className="icon-link"
            />
            {/* REMOVED <SearchBar /> from here */}
          </a>
          <a href="/cart">
            <img
              src="https://img.icons8.com/?size=32&id=tfTVg0rfwWjR&format=png&color=FFFFFF"
              alt=""
              className="icon-link"
            />
          </a>
          <a href="">
            <img
              src="https://img.icons8.com/?size=32&id=EqTEf56ejDqF&format=png&color=FFFFFF"
              alt=""
              className="icon-link"
            />
          </a>
          {token && (
            <a href="/myaccount" className="my-acc">
              MY ACCOUNT
            </a>
          )}
          {!token && (
            <a href="" className="my-acc" onClick={() => navigate("/login")}>
              LOGIN/ SIGNUP
            </a>
          )}
        </div>
      </nav>
      {/* CHANGED: pass the props */}
      <SearchBar searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
    </>
  );
};

export default NavBar;
