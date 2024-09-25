import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userLogIn, userLogout } from './authSlice'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://learning-management-server-swart.vercel.app/1.0',
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    userRegistration: builder.mutation({
      query: (user) => {
        return {
        url: '/users/signup',
        method: 'POST',
        body: user,
        }
      }
    }),

    userLogin: builder.mutation({
      query: (user) => {
        return {
        url: '/users/login',
        method: 'POST',
        body: user,
        credentials: 'include',
        }
      },
      async onQueryStarted(args, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          console.log("RESULT",result);
          dispatch(
            userLogIn({
              access_token: result.data.data.access_token,
            })
          );
        } catch (error) {
          console.error(error);
        }
      }
    }),

    userLogout: builder.mutation({
      query: () => {
        return {
        url: '/users/logout',
        method: 'POST',
        body: {},
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Required to set the cookies
        }
      },
      async onQueryStarted(args, {queryFulfilled, dispatch}) {
        try {
          await queryFulfilled(args);
          dispatch(
            userLogout()
          );
        } catch (error) {
          console.error(error);
        }
      }
    }),

    refreshToken: builder.mutation({
      query: () => {
        return {
        url: '/users/refresh-token',
        method: 'GET',
        credentials: 'include',
        }
      }
    }),
  }),
})

export const { useUserRegistrationMutation, useUserLoginMutation, useUserLogoutMutation, useRefreshTokenMutation } = authApi