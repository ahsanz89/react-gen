import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: false,
  userType:1
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeUserType:(state, action) => {
      state.userType = action.payload;
    },
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setAuthToken, changeUserType } = authSlice.actions;
export const getAuthToken = (state) => state.auth.token;
export const getUserType = (state) => state.auth.userType;

export default authSlice.reducer;
