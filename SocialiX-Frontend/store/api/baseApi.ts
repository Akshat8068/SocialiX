
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRetry } from "./fetchBaseQuery";

 const baseApi = createApi({
  reducerPath: "api",
  baseQuery:baseQueryWithRetry,

   tagTypes: ["Auth", "Profile", "Follow", "Post", "Hashtags", "Like",
     "Comment","Saved","Chat","Message","Notification"],

  endpoints: () => ({})
})

export default baseApi