import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./post";
import authReducer from "./auth";
import commentReducer from "./comment";

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    comment: commentReducer,
    // Add other reducers here if needed
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
