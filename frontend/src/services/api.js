import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 10000,
});


// ✅ Request interceptor (optional debug)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ct_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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