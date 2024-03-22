import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AdminState {
  id: string;
  name: string;
  email: string;
  isLoggedIn?: boolean
}

const initialState: AdminState = {
  id: "",
  name: "",
  email: "",
  isLoggedIn: false
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AdminState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  }
});

export const { login, logout } = adminSlice.actions;
export const selectAdmin = (state: any) => state.admin;
export default adminSlice.reducer;