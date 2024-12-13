import { useMutation } from "@tanstack/react-query";
import { AddProducts } from "@/apis/services/products";
import { toast } from "react-toastify";


export const useAdd = () => {
  return useMutation({
    mutationKey: ["Add"],
    mutationFn: AddProducts,
    onSuccess: (data) => {
      toast.success("افزودن با موفقیت انجام شد");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "An error occurred during  Add";
      toast.error("عملیات افزودن انجام نشد");
    },
  });
};
