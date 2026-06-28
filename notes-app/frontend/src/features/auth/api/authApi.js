import api from "@/lib/axios";

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const refreshAccessToken = async () => {
  const response = await api.post("/auth/refresh");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const updateProfileApi = async (data) => {
  const response = await api.patch("/auth/update-profile", data);
  return response.data;
};

export const changePasswordApi = async (data) => {
  const response = await api.patch("/auth/change-password", data);
  return response.data;
};