import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  token: '',
};

const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = '';
    },
  },
});

export const { loginSuccess, logout } = AuthSlice.actions;

export default AuthSlice.reducer;