"use client";

import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import privateRequest from "@/services/axios-utils";
import { getAsyncCookie } from "./cookieCtrl";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = privateRequest.interceptors.request.use(
      async (config) => {
        const access_token = await getAsyncCookie("tk");
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = privateRequest.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return privateRequest(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      privateRequest.interceptors.request.eject(requestIntercept);
      privateRequest.interceptors.response.eject(responseIntercept);
    };
  }, [refresh]);

  return privateRequest;
};

export default useAxiosPrivate;
