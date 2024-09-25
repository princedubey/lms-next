import { createSlice } from '@reduxjs/toolkit';

// Function to safely access localStorage only on the client side
const getClientToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token') || null;
  }
  return null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: getClientToken(), // Initialize token from localStorage
    loading: true,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Save token to localStorage
      state.loading = false;
    },
    logout: (state) => {
      state.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token'); // Remove token from localStorage
      }
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
