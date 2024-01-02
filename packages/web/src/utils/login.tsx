import Cookies from "js-cookie";
import { decodeJwt } from "jose";

interface ValidateAndSetTokensProps  {
  accessToken: string,
  idToken: string | null,
  refreshToken?: string,
  state?: string
}


export function handleLogout() {
  Cookies.remove("access_token");
  Cookies.remove("id_token");
  Cookies.remove("refresh_token");
  Cookies.remove("state");
  Cookies.remove("nonce");
  Cookies.remove("state");
}


export function recoverTokens() {

  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");
  const sessionState = Cookies.get("state");

  if (!accessToken) {
    throw new Error("No access token");
  }

  return {
    accessToken,
    refreshToken,
    sessionState,
  };
}


export function validateAndSetTokens(input: ValidateAndSetTokensProps) {
  const { accessToken, idToken, refreshToken, } = input;

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

export function makeLoginUrl(){
  const isLocalhost = window.location.hostname === 'localhost';
  let realm: string;

  if (isLocalhost) {
    realm = process.env.NEXT_PUBLIC_REALM!;
  } else {
    const subdomain = window.location.hostname.split('.')[0];
    realm = subdomain;
  }

  const nonce = Math.random().toString(36);
  const state = Math.random().toString(36);

  Cookies.set("nonce", nonce);
  Cookies.set("state", state);

  const loginUrlParams = new URLSearchParams({
    client_id: "web-client",
    redirect_uri: "http://localhost:3001/callback",
    response_type: "token id_token code",
    nonce: nonce,
    state: state,
  });

  return `http://localhost:8080/realms/${realm}/protocol/openid-connect/auth?${loginUrlParams.toString()}`;
}