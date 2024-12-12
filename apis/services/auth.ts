import { urls } from "../urls";
import { generateClient } from "../client";
import { LoginResponse } from "@/types/login-response";
import { authSchemaType } from "../../validation/auth";

type loginType = (_: authSchemaType) => Promise<LoginResponse>;
export const login: loginType = async (body) => {
  const response = await generateClient().post(urls.auth.loginIn, body);
  return response.data;
};