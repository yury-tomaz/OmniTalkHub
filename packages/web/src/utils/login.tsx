import Cookies from "js-cookie";
import { decodeJwt } from "jose";

interface ValidateAndSetTokensProps  {
  accessToken: string;
  idToken: string;
  refreshToken?: string;
  sessionState?: string;
}
export function recoverTokens() {
  const accessToken = Cookies.get("access_token");
  const idToken = Cookies.get("id_token");
  const refreshToken = Cookies.get("refresh_token");
  const sessionState = Cookies.get("session_state");

  if (!accessToken) {
    throw new Error("No access token");
  }

  if (!idToken) {
    throw new Error("No id token");
  }

  return {
    accessToken,
    idToken,
    refreshToken,
    sessionState,
  };
}


export function validateAndSetTokens(input: ValidateAndSetTokensProps) {
  const { accessToken, idToken, refreshToken, sessionState } = input;

  let decodedAccessToken = null;
  let decodedRefreshToken = null;
  try {
    decodedAccessToken = decodeJwt(accessToken);


    if (refreshToken) {
      decodedRefreshToken = decodeJwt(refreshToken);
    }
  } catch (e) {
    console.error(e);
    throw new Error("Invalid token");
  }

  Cookies.set("access_token", accessToken);

  if (idToken) {
    Cookies.set("id_token", idToken);
  }

  if (decodedRefreshToken) {
    Cookies.set("refresh_token", refreshToken as string);
  }

  return decodedAccessToken;
}