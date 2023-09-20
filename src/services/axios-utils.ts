import axios from "axios";

export const BASE_URL = "http://localhost:5000";

const privateRequest = axios.create({
  baseURL: BASE_URL + "/api/v1",
  withCredentials: true,
});

export const publicRequest = axios.create({
  baseURL: BASE_URL + "/api/v1",
  withCredentials: true,
});

export default privateRequest;
