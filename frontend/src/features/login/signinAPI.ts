import axios, { AxiosError } from "axios";
import { SigninInput } from "./signinTypes";
import { BACKEND_URL } from "../../config";

export const signinAPI = async (data: SigninInput) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/signin`,
      data
    );
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data?.message || "Signin Failed");
  }
};
