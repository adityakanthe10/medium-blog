// src/features/blog/api/createBlogApi.ts
import axios from "axios";
import { CreateBlogPayload,BlogResponse } from "./createBlogType";

const BACKEND_URL = process.env.VITE_BACKEND_URL;

export const createBlog = async (
  blogData: CreateBlogPayload,
  token: string
): Promise<BlogResponse> => {
  const response = await axios.post(`${BACKEND_URL}/api/v1/blog/blog`, blogData, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
