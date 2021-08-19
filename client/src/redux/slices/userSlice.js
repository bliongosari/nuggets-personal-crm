import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  tokenExpDate: null,
  userData: {
    id: null,
    fullname: null,
  },
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.name = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
