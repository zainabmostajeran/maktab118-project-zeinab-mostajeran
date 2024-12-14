import { urls } from "../urls";
import axiosInstance from "../client";
import { LoginResponse } from "@/types/login-response";
import { authSchemaType } from "../../validation/auth";

type loginType = (_: authSchemaType) => Promise<LoginResponse>;
export const login: loginType = async (body) => {
  const response = await axiosInstance.post(urls.auth.loginIn, body);
  return {data:response.data.data,token:response.data.token};
};