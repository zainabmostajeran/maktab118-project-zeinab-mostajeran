import { useMutation } from "@tanstack/react-query";
import { Logout } from "../services/auth";
import { useDispatch } from "react-redux";
import {
logout
} from "../../redux/slices/authSlice";
import { removeTokens, setTokens } from "@/libs/session-manager";

export const uselogout = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: Logout,
    mutationKey: ["logout"],
    onSuccess: (data) => {
      removeTokens();
      console.log(data);

      dispatch(logout());}
  });
};
