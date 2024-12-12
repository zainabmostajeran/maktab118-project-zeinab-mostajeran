"use client";

import useAuthToken from "@/hooks/useAuthToken";

const AuthHandler: React.FC = () => {
  useAuthToken();
  return null;
};

export default AuthHandler;
