// Handles Authentication

import apiClient from "./apiClient";

export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/user/signup", { email, password });
  return response.data;
};
