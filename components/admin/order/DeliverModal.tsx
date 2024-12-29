"use client";

import React from "react";
import { updateOrderDeliveryStatus } from "@/apis/services/orders";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Modal from "@/components/ui/Modal";
import { getAllProducts } from "@/apis/services/products";

interface DeliverModalProps {
  order: IOrders;
  user: IUser;
  onClose: () => void;
}
const toPersianDigits = (num: string | number): string => {
  return num
    .toString()
    .replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(digit, 10)]);
};

export const DeliverModal: React.FC<DeliverModalProps> = ({
  order,
  user,
  onClose,
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => updateOrderDeliveryStatus(order._id, true),
    onSuccess: () => {
      queryClient.invalidateQueries(["get-delivered-orders"]);
      toast.success("سفارش با موفقیت تحویل شد");
      onClose();
    },
    onError: (error: any) => {
      console.error("Error updating delivery status:", error);
      toast.error("خطا در تحویل سفارش");
    },
  });

  const handleMarkAsDelivered = () => {
    mutation.mutate();
  };

  const {
    data: productsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  console.log(productsData?.data?.products);
  const filterProduct = productsData?.data?.products?.filter(
   (product: IProducts) => {
    return product._id === order?.products?._id;
    }
  );
  console.log(filterProduct);

  const formattedDeliveryDate = order.deliveryDate
    ? new Date(order.deliveryDate).toLocaleString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : "نامشخص";

  const formattedCreatedAt = order.createdAt
    ? new Date(order.createdAt).toLocaleString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : "نامشخص";

  return (
    <Modal isOpen={true} onClose={onClose}>
      <section className="flex flex-col items-center gap-y-8 py-12 px-4">
        <div className="flex flex-col gap-5 justify-start w-full">
          <div className="flex gap-1 items-start justify-center w-full">
            <p className="font-bold">نام مشتری:</p>
            <p>{`${user?.firstname} ${user?.lastname}` || "نامشخص"}</p>
          </div>
          <div className="flex gap-1 items-start justify-center w-full">
            <p className="font-bold">آدرس:</p>
            <p>{user?.address || "نامشخص"}</p>
          </div>
          <div className="flex gap-1 items-start justify-center w-full">
            <p className="font-bold">تلفن:</p>
            <p>
              {user?.phoneNumber ? toPersianDigits(user.phoneNumber) : "نامشخص"}
            </p>
          </div>
          <div className="flex gap-1 items-start justify-center w-full">
            <p className="font-bold">زمان تحویل:</p>
            <p>{formattedDeliveryDate}</p>
          </div>
          <div className="flex gap-1 items-start justify-center w-full">
            <p className="font-bold">زمان سفارش:</p>
            <p>{formattedCreatedAt}</p>
          </div>
        </div>

        <table className="w-full text-center mt-4">
          <thead className="text-center bg-gray-200">
            <tr>
              <th>کالا</th>
              <th>قیمت</th>
              <th>موجودی</th>
            </tr>
          </thead>
          <tbody className="bg-gray-500 text-white">
            {order.products.map((item) => (
              <tr key={item._id}>
                <td>{item.productName || "نامشخص"}</td>
                <td>
                  {item.price !== undefined && item.price !== null
                    ? item.price.toLocaleString("fa-IR")
                    : "نامشخص"}
                  {console.log(item.price)}
                </td>
                <td>{item.count || "نامشخص"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!order.deliveryStatus && (
          <div className="flex justify-center w-full">
            <button
              onClick={handleMarkAsDelivered}
              className="px-4 py-2 rounded-md bg-textColor text-gray-900  hover:bg-white  disabled:opacity-50"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "در حال انجام..." : "تحویل شد"}
            </button>
          </div>
        )}
      </section>
    </Modal>
  );
};
