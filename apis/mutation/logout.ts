import { useMutation } from "@tanstack/react-query";
import { Logout } from "../services/auth";
import { useDispatch } from "react-redux";
import {
logout
} from "../../redux/slices/authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: Logout,
    mutationKey: ["logout"],
    onSuccess: (data) => {
      dispatch(logout());}
  });
};
