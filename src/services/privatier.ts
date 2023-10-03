"use client";

import axios, { AxiosError, AxiosHeaders } from "axios";
import jwtDecode from "jwt-decode";

import {
  deleteCookie,
  getCookie,
  setCookieFromJWT,
} from "@/lib/authUtils/cookieCtrl";
import { BASE_URL } from "./axios-utils";
import dayjs from "dayjs";

const ACCESS_TOKEN = getCookie("tk");
const REFRESH_TOKEN = getCookie("rtk");

/**
 * This was created a my custom next auth knowledge increase.
 * It basically does the same thing as the useAxiosAuth hook the only thing is that one is an hook
 */
const modifiedPrivateRequester = axios.create({
  baseURL: BASE_URL + "/api/v1",
  withCredentials: true,
});

modifiedPrivateRequester.interceptors.request.use(async (config) => {
  (config.headers as AxiosHeaders).set(
    "Authorization",
    `Bearer ${ACCESS_TOKEN}`
  );

  const access_decoded: any = jwtDecode(ACCESS_TOKEN as string);
  const isExpired = dayjs.unix(access_decoded.exp).diff(dayjs()) < 1;

  if (!isExpired) return config;

  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/refresh`, {
      refresh_token: REFRESH_TOKEN,
    });

    if (ACCESS_TOKEN) {
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

export default modifiedPrivateRequester;
