import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query";
import { logout } from "../slices/auth.slice";


const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Original request
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "/auth/refreshToken",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh token expired
      api.dispatch(logout());

      if (typeof window !== "undefined") {
        window.location.replace("/login");
      }
    }
  }

  return result;
}

export const baseQueryWithRetry = retry(baseQueryWithReauth, {
  maxRetries: 3,
})