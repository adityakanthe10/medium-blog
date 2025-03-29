import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../../config";
import { SignupInput } from "./signupTypes";

export const signupAPI = async (data: SignupInput) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/signup`,
      data
    );
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data?.message || "Signup Failed");
  }
};
