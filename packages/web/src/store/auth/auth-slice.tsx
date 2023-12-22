import { createSlice } from "@reduxjs/toolkit";
import { validateAndSetTokens } from "@/utils/login";

const initialState = {
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
          idToken: action.payload.idToken,
          refreshToken: action.payload.refreshToken,
          sessionState: action.payload.sessionState,
        }
      );

    },
    logout: (state) => {
      state.auth = null;
    },
  },
});

export const {
  login,
  logout,
} = AuthSlice.actions;
export default AuthSlice.reducer;