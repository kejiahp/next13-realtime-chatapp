"use client";

import { getCookie, getCurrentUser } from "@/lib/authUtils/cookieCtrl";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentUser = getCurrentUser();

  if (isMounted) {
    if (!currentUser) {
      return null;
    }

    return currentUser;
  }
  return null;
};

export const useGetAccessToken = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  return isMounted ? getCookie("tk") : null;
};

export const useGetRefreshToken = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  return isMounted ? getCookie("rtk") : null;
};
