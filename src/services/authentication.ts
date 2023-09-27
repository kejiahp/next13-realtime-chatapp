import axios from "axios";
import { BASE_URL, publicRequest } from "./axios-utils";
import { getCookie } from "@/lib/authUtils/cookieCtrl";

export const registerUserService = async (payload: any) => {
  const res = await publicRequest.post(`/auth/signup`, payload);
  return res.data;
};

export const loginUserService = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const loginURL = `/auth/login`;
    const res = await publicRequest.post(loginURL, payload);
    return res.data;
  } catch (error: any) {
    if (!error?.response) {
      throw new Error("No Server Response");
    } else if (error?.response.status === 400) {
      throw new Error("Invalid Credentials");
    } else if (error?.response.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error("Login Failed");
    }
  }
};

export const logOutService = async () => {
  try {
    const refreshToken = getCookie("rtk");
    const res = await axios.post(
      `${BASE_URL}/api/v1/auth/logout`,
      {},
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
      }
    );
    return res.data;
  } catch (error: any) {
    console.log(error);
  }
};
