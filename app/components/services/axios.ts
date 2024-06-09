import axios from "axios";
import { error } from "console";

const axiosInstances = axios.create({
  baseURL: "https://dummyjson.com",
});

axiosInstances.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("access");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    console.log("VERY GOOOD from axios interceptor");

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstances.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized access - possibly invalid token.");
      } else if (error.response.status === 404) {
        console.error("Requested resource not found.");
      } else {
        console.error(
          "An error occurred:",
          error.response.status,
          error.response.data
        );
      }
    } else {
      console.error("An error occurred:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstances;
