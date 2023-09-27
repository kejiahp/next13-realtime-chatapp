"use client";

import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const publicRequest = axios.create({
  baseURL: BASE_URL + "/api/v1",
  withCredentials: true,
});

const privateRequest = axios.create({
  baseURL: BASE_URL + "/api/v1",
  withCredentials: true,
});

export default privateRequest;
