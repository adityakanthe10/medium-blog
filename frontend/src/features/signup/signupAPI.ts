import axios from "axios";
import { BACKEND_URL } from "../../config";
import { SignupInput } from "./signupTypes";

export const signupAPI = async (data: SignupInput) => {
  const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, data);
  return response.data;
};
