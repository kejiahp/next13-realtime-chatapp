import axios from "axios";

export const BASE_URL = "http://localhost:5000/api";

const privateRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default privateRequest;
