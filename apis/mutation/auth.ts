import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/slices/authSlice";
import { setSessionToken } from "@/libs/session-manager";

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: login,
    mutationKey: ["login"],
    onMutate: () => {
      dispatch(loginStart());
    },
    onSuccess: (data) => {
      console.log(data);
      dispatch(loginSuccess(data.token, data.data.user));
      setSessionToken(data.token.accessToken);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "An error occurred during login.";
      dispatch(loginFailure(errorMessage));
    },
  });
};
