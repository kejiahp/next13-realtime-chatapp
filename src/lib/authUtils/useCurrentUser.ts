"use client";

import { getCurrentUser } from "@/lib/authUtils/cookieCtrl";
import { useEffect, useState } from "react";

const useCurrentUser = () => {
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

export default useCurrentUser;
