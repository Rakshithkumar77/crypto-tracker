import axios from "axios";

const api = axios.create({
  baseURL: "http://3.110.60.247:5000/api", // ✅ Your AWS backend URL
  timeout: 10000, // optional but good practice
});

// ✅ Request interceptor (optional debug)
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor (IMPORTANT for debugging)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error?.response || error.message);
    return Promise.reject(error);
  }
);

export default api;