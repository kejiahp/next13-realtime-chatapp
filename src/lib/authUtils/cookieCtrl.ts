"use client";

import { UserType } from "@/types/UserType";
import jwtDecode from "jwt-decode";

type DecodedToken = {
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
    const expiryDate = new Date(decoded.exp * 1000).toUTCString();

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
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

/**
 * *Client side function*
 *
 * Get a cookie
 * @param cname cookie name
 */
export function getCookie(cname: string) {
  if (window !== undefined) {
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
