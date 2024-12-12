import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Token {
  accessToken: string;
  refreshToken: string;
}

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  tokens: Token | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ tokens: Token; user: User }>) {
      state.tokens = action.payload.tokens;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.tokens = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    updateTokens(state, action: PayloadAction<Token>) {
      state.tokens = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateTokens } =
  authSlice.actions;

export default authSlice.reducer;
