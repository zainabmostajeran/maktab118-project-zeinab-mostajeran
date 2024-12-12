import axios from "axios";
import { getSessionToken } from "../libs/session-manager";

export const generateClient = () => {
  const token = getSessionToken();
  const headers: Record<string, string> = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: "http://localhost:8000/api",
    timeout: 3000,
    headers,
  });
};