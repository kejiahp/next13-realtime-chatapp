"use client";

import { UserType } from "@/types/UserType";
import jwtDecode from "jwt-decode";

export type DecodedToken = {
  iat: number;
  exp: number;
} & UserType;

/**
 * *Client side function*
 *
 * Function to create a cookie from a jwt token
 * @param cname cookie name
 * @param ctoken token value
 */
export function setCookieFromJWT(cname: string, ctoken: string) {
  try {
    const decoded: DecodedToken = jwtDecode(ctoken);
    let expUnix = decoded.exp;
    //access_token lifespan increased by a day
    if (cname === "tk") {
      expUnix = expUnix + 60 * 60 * 24;
    }

    const expiryDate = new Date(expUnix * 1000).toUTCString();

    let expires = "expires=" + expiryDate;
    document.cookie = cname + "=" + ctoken + ";" + expires + ";path=/";
  } catch (error: any) {
    console.log(error);
  }
}

/**
 * *Client side function*
 *
 * Function to delete a cookie
 * @param cname cookie name
 */
export function deleteCookie(cname: string) {
  if (typeof document !== "undefined") {
    document.cookie =
      cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}

/**
 * *Client side function*
 *
 * Get a cookie
 * @param cname cookie name
 */
export function getCookie(cname: string) {
  if (typeof window !== "undefined") {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  } else {
    return "";
  }
}

export async function getAsyncCookie(cname: string) {
  return new Promise((resolve, reject) => {
    const token = getCookie(cname);
    if (token) {
      resolve(token);
    } else {
      reject("INVALID TOKEN");
    }
  });
}

// export default function useStorage(key:string, type = "sessionStorage") {
//   const [value, setValue] = useState();

//   // Initial fetch from storage
//   useEffect(() => {
//     const storage = type === "sessionStorage" ? sessionStorage : localStorage;
//     setValue(storage.getItem(key));
//   }, [key, type]);

//   // Persist to storage
//   useEffect(() => {
//     // first render, don't override/destroy existing item value
//     if (value !== undefined) {
//       const storage = type === "sessionStorage" ? sessionStorage : localStorage;
//       storage.setItem(key, value);
//     }
//   }, [key, value, type]);

//   return [value, setValue];
// }

/**
 * *Clien side function*
 *
 * Get current user
 */
export const getCurrentUser = () => {
  try {
    const decoded: DecodedToken = jwtDecode(getCookie("tk"));
    return decoded;
  } catch (error: any) {
    return null;
  }
};
