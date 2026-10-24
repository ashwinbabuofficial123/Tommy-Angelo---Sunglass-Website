import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ScrollToTop from "./components/scroll.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../Context/userContext.jsx";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "../Toolkit/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
