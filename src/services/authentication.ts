import { BASE_URL, publicRequest } from "./axios-utils";

export const registerUserService = async (payload: any) => {
  const res = await publicRequest.post(`/auth/signup`, payload);
  return res.data;
};

export const loginUserService = async (user: {
  email: string;
  shortName: string;
  password: string;
}) => {
  try {
    const { shortName, ...payload } = user;
    const loginURL = `${BASE_URL}/auth/login`;
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
