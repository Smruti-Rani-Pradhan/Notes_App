import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Clean up legacy localStorage keys if present
try {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
} catch (e) {}

// Attach Authorization header from stored access token
api.interceptors.request.use((config) => {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore
  }

  return config;
});

// Automatically handle token expiration and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      try {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("user");
      } catch (e) {}
      
      // Redirect to login if not already there
      if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;