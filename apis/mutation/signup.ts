import { useMutation } from "@tanstack/react-query";
import { Signup } from "../services/auth";

export const useSignup = () => {
  return useMutation({
    mutationFn: Signup,
    mutationKey: ["Signup"],
  });
};
