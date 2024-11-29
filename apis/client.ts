import axios from "axios";

export const generateClient = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_PostMan_URL,
  });
};