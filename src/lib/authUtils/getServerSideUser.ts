import { cookies } from "next/headers";
import jwtDecode from "jwt-decode";
import { UserType } from "@/types/UserType";

type DecodedToken = {
  iat: number;
  exp: number;
} & UserType;

/**
 * Server side function
 *
 * Get current user on the server side components
 */
export function getServerSideUser() {
  const token = cookies().get("tk");

  if (!token) {
    return null;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token.value);
    return decoded;
  } catch (error: any) {
    return null;
  }
}

export function getMiddlewareCurrentUser(request: any) {
  const currentUserAccessToken = request.cookies.get("tk");

  if (!currentUserAccessToken) {
    return null;
  }

  try {
    const decoded: DecodedToken = jwtDecode(currentUserAccessToken.value);
    return decoded;
  } catch (error: any) {
    return null;
  }
}
