import { User } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null
  isAuthenticated: boolean;
  authChecked: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  authChecked: false,
  user: null
}

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginSuccess(state, action: PayloadAction<User>) {
    state.user = action.payload;
    state.isAuthenticated = true;
    state.authChecked = true;
  },
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload
    },

    setAuthChecked(state, action: PayloadAction<boolean>) {
      state.authChecked = action.payload
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null
      state.isAuthenticated = false
      state.authChecked = true
    },
  },
})

export const {
  setAuthenticated,
  loginSuccess,
  setUser,
  setAuthChecked,
  logout,
} = authSlice.actions

export default authSlice.reducer