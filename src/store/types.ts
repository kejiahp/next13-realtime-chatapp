export interface IUserTokens {
  access_token: string | null;
  refresh_token: string | null;
}

export interface IUserTokensActions {
  setTokens: (data: { access_token: string; refresh_token: string }) => void;
  deleteTokens: () => void;
}
