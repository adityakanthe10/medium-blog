// Axios Instance Setup

import axios from "axios";

const apiClient = axios.create({
  baseURL: "",
  headers: {},
});

export default apiClient;
