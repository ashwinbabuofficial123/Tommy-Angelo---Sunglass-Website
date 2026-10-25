import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage";
import NavBar from "./components/navbar";
import { ToastContainer } from "react-toastify";
import ProductCard from "./components/product-card";
import ProductView from "./pages/productViewPage";
import LoginCard from "./components/loginCard";
import Cart from "./pages/cartPage";
import { useLocation } from "react-router-dom";
import { PrivateRoute } from "./components/privateRoute";
import LoginPage from "./pages/loginPage";
import CheckoutPage from "./pages/checkoutPage";
import MyAccountPage from "./pages/myaccountPage";
import { AnimatePresence } from "motion/react";
import PageTransition from "./components/AnimatePresence";
import Products from "./pages/productsPage";
import AdminPage from "./pages/adminPage";
import AdminRoute from "./components/AdminRoute";
import SignupCard from "./components/signupCard";
function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname != "/admin" && location.pathname != "/login" && (
        <NavBar />
      )}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<PrivateRoute />}>
            <Route
              path="/cart"
              element={
                <PageTransition>
                  <Cart />
                </PageTransition>
              }
            />
            <Route
              path="/checkout"
              element={
                <PageTransition>
                  <CheckoutPage />
                </PageTransition>
              }
            />
            <Route
              path="/myaccount"
              element={
                <PageTransition>
                  <MyAccountPage />
                </PageTransition>
              }
            />
          </Route>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />
          <Route
            path="/product/:id"
            element={
              <PageTransition>
                <ProductView />
              </PageTransition>
            }
          />
          <Route
            path="/login"
            element={
              <PageTransition>
                <LoginPage />
              </PageTransition>
            }
          />{" "}
          <Route
            path="/signup"
            element={
              <PageTransition>
                <SignupCard />
              </PageTransition>
            }
          />
          <Route
            path="/products"
            element={
              <PageTransition>
                <Products />
              </PageTransition>
            }
          />
          <Route
            path="/admin"
            element={
              <PageTransition>
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
