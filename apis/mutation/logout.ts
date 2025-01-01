import { useMutation } from "@tanstack/react-query";
import { Logout } from "../services/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  return useMutation({
    mutationFn: Logout,
    mutationKey: ["logout"],
    onSuccess: () => {
      console.log("called");
      dispatch(logout());
      push("/auth/login");
    },
    onError: () => {
      dispatch(logout());
      push("/auth/login");
    },
  });
};
