import type { LoginData, RegisterData } from "@/types/auth";
import { apiClient } from "./api";

const registerUser = async (FormData: RegisterData) => {
  const response = await apiClient.post("/auth/register", FormData);
  return response.data;
};

const loginUser = async (FormData: LoginData) => {
  //   console.log(FormData);
  const response = await apiClient.post("/auth/login", FormData);
  return response.data;
};

const logout = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

const getMe = async () => {
  const response = await apiClient.get("/auth/getMe");
  return response.data;
};

export { registerUser, loginUser, getMe, logout };
