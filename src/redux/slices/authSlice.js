import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.token = false;
      state.userData = null;
      localStorage.removeItem("login");
      localStorage.removeItem("user");
    },
  },
});

export const { setToken, setUserData, logout } = authSlice.actions;
export default authSlice.reducer;
