"use client";

import {
  deleteCookie,
  getCookie,
  setCookieFromJWT,
} from "@/lib/authUtils/cookieCtrl";
import axios, { AxiosError, AxiosHeaders } from "axios";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const ACCESS_TOKEN = getCookie("tk");
const REFRESH_TOKEN = getCookie("rtk");

export const publicRequest = axios.create({
  baseURL: BASE_URL + "/api/v1",
  withCredentials: true,
});

const privateRequest = axios.create({
  baseURL: BASE_URL + "/api/v1",
  headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
  withCredentials: true,
});

//Refresh Token handling
privateRequest.interceptors.request.use(async (config) => {
  const accessToken = ACCESS_TOKEN;
  const refreshToken = REFRESH_TOKEN;

  (config.headers as AxiosHeaders).set(
    "Authorization",
    `Bearer ${accessToken}`
  );

  const access_decoded: any = jwtDecode(accessToken as string);
  const isExpired = dayjs.unix(access_decoded.exp).diff(dayjs()) < 1;

  if (!isExpired) return config;

  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/refresh`, {
      refresh_token: refreshToken,
    });

    if (accessToken) {
      deleteCookie("tk");
      setCookieFromJWT("tk", response.data.access_token);
    }

    (config.headers as AxiosHeaders).set(
      "Authorization",
      `Bearer ${response.data.access_token}`
    );
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      deleteCookie("tk");
      deleteCookie("rtk");
      window.location.replace("/login");
    }
  }

  return config;
});

export default privateRequest;
