import { urls } from "../urls";
import axiosInstance from "../client";
import { LoginResponse } from "@/types/login-response";
import { authSchemaType } from "../../validation/auth";
import { signupSchemaType } from "../../validation/signup";

type loginType = (_: authSchemaType) => Promise<LoginResponse>;
export const login: loginType = async (body) => {
  const response = await axiosInstance.post(urls.auth.loginIn, body);
  return response.data;
};

export const Logout = async () => {
  const response = await axiosInstance.get(urls.auth.logout);
  return response.data;
};

type signupType = (_: signupSchemaType) => Promise<LoginResponse>;
export const Signup: signupType = async (body) => {
  const response = await axiosInstance.post(urls.auth.signup, body);
  return response.data;
};
