import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAxiosInstace = () => {
  const instance = axios.create({
    baseURL: `${baseURL}`,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });

  return instance;
};
