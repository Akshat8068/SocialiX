
import baseApi from "@/store/api/baseApi";
import { ApiResponse } from "@/types/api";
import type {
  AuthResponse,
  ForgetEmailRequest,
  ForgetEmailResponse,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
  User,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from "@/types/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
       url: "/auth/logout",
        method: "POST"
      }), 
      invalidatesTags: ["Auth"]
    }),
    emailVerify: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
      query: (data) => ({
        url: "/auth/emailVerify",
        method: "POST",
        body: data,
      }),


      invalidatesTags: ["Auth"],
    }),
    forgetEmail: builder.mutation<ForgetEmailResponse, ForgetEmailRequest>({
      query: (data) => ({
        url: "/auth/forgetPassword",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (data) => ({
        url: "/auth/resetPassword",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    getMe: builder.query<ApiResponse<User>, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["Auth"]
    }),
    
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useEmailVerifyMutation,
  useLogoutMutation,
  useForgetEmailMutation,
  useResetPasswordMutation,
  useGetMeQuery
} = authApi;