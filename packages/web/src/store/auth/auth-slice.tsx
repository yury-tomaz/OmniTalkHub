import { createSlice } from "@reduxjs/toolkit";
import { handleLogout, validateAndSetTokens } from "@/utils/login";

interface TokenPayload {
  exp: number;
  iat: number;
  auth_time: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  nonce: string;
  session_state: string;
  acr: string;
  'allowed-origins': string[];
  realm_access: {
    roles: string[];
  };
  resource_access: {
    account: {
      roles: string[];
    };
  };
  scope: string;
  sid: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}

export interface AuthState {
  auth: TokenPayload | null;
}

const initialState: AuthState = {
  auth: null,
}

export const AuthSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, action) => {
      state.auth = validateAndSetTokens(
        {
          accessToken: action.payload.accessToken,
          idToken: action.payload.idToken ?? null,
          refreshToken: action.payload.refreshToken,
          state: action.payload.sessionState,
        }
      );
    },
    logout: (state) => {
      handleLogout();
      state.auth = null;
    },
  },
});

export const {
  login,
  logout,
} = AuthSlice.actions;
export default AuthSlice.reducer;