import { createSlice } from "@reduxjs/toolkit";
import jwt from "jsonwebtoken";

const initialState = {
  isAuthenticated: false, // Authentication status
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export const isTokenValid = (token) => {
  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      return false;
    }

    // Check if the token is expired
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

//userInfo : {userId,username,blogId}
export const getUserInfo = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.decode(token);
    return {
      userId: decoded.userId,
      username: decoded.username,
      imageUrl: decoded.imageUrl,
      blogId: decoded.blogId,
    };
  } catch (error) {
    return null;
  }
};

export default authSlice.reducer;
