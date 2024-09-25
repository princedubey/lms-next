import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({

    name: 'auth',
    initialState: {
        token: null,
        loading: true,
    },
    reducers: {
        userLogIn: (state, action) => {
            localStorage.setItem('token', action.payload.access_token); // Save token to localStorage
            state.token = action.payload.access_token;
            state.loading = false;
        },
        userLogout: (state) => {
            state.token = null;
            state.loading = false;
        }
    }

})

export const { userLogIn, userLogout } = authSlice.actions;

export default authSlice.reducer;