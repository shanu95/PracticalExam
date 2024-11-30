import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  loggedIn: boolean;
}

const initialState: AuthState = {
  token: null,
  loggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.loggedIn = !!action.payload;
    },

    logout: (state) => {
      state.token = null;
      state.loggedIn = false;
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
