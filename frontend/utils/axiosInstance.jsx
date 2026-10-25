import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://tommy-angelo-sunglass-website-1.onrender.com",
  timeout: 4000,
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export default axiosInstance;
