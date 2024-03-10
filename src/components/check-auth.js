"use client";
import { useEffect, useState } from "react";
import { getAuthToken } from "@/lib/api/axios";
import { getUserInfo, isTokenValid } from "@/lib/store/auth";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/lib/store/auth";

function CheckAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const authToken = getAuthToken();
    if (isTokenValid(authToken)) {
      const userInfo = getUserInfo();
      dispatch(authActions.authenticateUser(userInfo));
    } else {
      localStorage.removeItem("token");
    }
  }, [dispatch]);
}
export default CheckAuth;
