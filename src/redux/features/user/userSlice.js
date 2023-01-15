import { createSlice } from '@reduxjs/toolkit';

const initialState =  {
  data: {},
  token: '',
  tokenType: ''
};

const reducers = {
  setUser(state, action) {
    state.data = action.payload.user;
    state.token = action.payload.token;
    state.tokenType = action.payload.token_type;
    localStorage.setItem(`token:${import.meta.env.VITE_APP_PERSIST_KEY}`,  action.payload.token);
  },
  removeUser(state) {
    state.data = initialState.data;
    state.token = initialState.token;
    state.tokenType = initialState.tokenType;
    localStorage.removeItem(`token:${import.meta.env.VITE_APP_PERSIST_KEY}`);
    localStorage.removeItem(`persist:${import.meta.env.VITE_APP_PERSIST_KEY}`);
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers
});

export const userAction = userSlice.actions;

export default userSlice;
