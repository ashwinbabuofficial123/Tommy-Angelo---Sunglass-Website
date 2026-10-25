import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:10000",
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
