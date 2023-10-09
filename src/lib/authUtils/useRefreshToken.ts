import { BASE_URL } from "@/services/axios-utils";
import { deleteCookie, getAsyncCookie, setCookieFromJWT } from "./cookieCtrl";
import axios from "axios";

const useRefreshToken = () => {
  const refresh = async () => {
    try {
      const REFRESH_TOKEN = await getAsyncCookie("rtk");
      const response = await axios.post(`${BASE_URL}/api/v1/auth/refresh`, {
        refresh_token: REFRESH_TOKEN,
      });
      deleteCookie("tk");
      setCookieFromJWT("tk", response.data.access_token);
      return response.data.access_token;
    } catch (error: any) {
      if (error.response?.status === 401 || error) {
        deleteCookie("tk");
        deleteCookie("rtk");
        window.location.replace("/login");
      }
    }
  };
  return refresh;
};

export default useRefreshToken;
