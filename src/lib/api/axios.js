"use client";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

instance.interceptors.request.use(
  (config) => {
    const authToken = getAuthToken();

    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

export function getAuthToken() {
  return localStorage.getItem("token");
}

export default instance;
