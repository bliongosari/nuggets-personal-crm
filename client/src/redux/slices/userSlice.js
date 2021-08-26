import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullname: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.fullname = action.payload;
    },
    logout: (state, action) => {
      state.fullname = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
