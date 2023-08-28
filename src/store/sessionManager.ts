import { create } from "zustand";
import { persist } from "zustand/middleware";
import jwtDecode from "jwt-decode";

import { IUserTokens, IUserTokensActions } from "./types";

export const userTokens = create<IUserTokens & IUserTokensActions>()(
  persist(
    (set) => ({
      access_token: null,
      refresh_token: null,
      setTokens: (data) =>
        set(() => ({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        })),
      deleteTokens: () =>
        set(() => ({ access_token: null, refresh_token: null })),
    }),
    { name: "ut" }
  )
);

export const currentUser = () => {
  const currentUserAccessTokens = userTokens.getState().access_token;

  if (!currentUserAccessTokens) return null;

  return jwtDecode(currentUserAccessTokens);
};
