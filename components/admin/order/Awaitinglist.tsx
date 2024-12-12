"use client";

import React from "react";
import Link from "next/link";
import { productsLimit } from "@/utils/config";
import { getOrders } from "@/apis/services/orders";
import { getUser } from "@/apis/services/users";
import { useQuery, useQueries } from "@tanstack/react-query";
import Image from "next/image";
import { classNames } from "@/utils/classname";
import { IOrdersResponse, IOrder } from "@/types/orders";

interface OrderListProps {
  page: number;
}
export const AwaitingList: React.FC<OrderListProps> = ({ page }) => {
  const {
    data: ordersData,
    isLoading: ordersLoading,
    isError: ordersError,
    error: ordersErrorData,
  } = useQuery<IOrdersResponse, Error>({
    queryKey: ["get-order", page],
    queryFn: () =>
      getOrders({
        page: String(page),
        limit: String(productsLimit),
      }),
    keepPreviousData: true,
  });
  
console.log(ordersData?.data?.orders);
const [isModalOpen, setIsModalOpen] =React.useState(false);


  const userIds = React.useMemo(() => {
    if (!ordersData?.data?.orders) return [];
    const ids = ordersData.data.orders.map((order) => order.user);
    return Array.from(new Set(ids));
  }, [ordersData]);

  const usersQueries = useQueries({
    queries: userIds.map((id) => ({
      queryKey: ["user", id],
      queryFn: () => getUser({ id }),
    })),
  });

  const usersMap: Record<string, IUser> = React.useMemo(() => {
    const map: Record<string, IUser> = {};
    usersQueries.forEach((query, index) => {
      if (query?.data?.data?.user) {
        map[userIds[index]] = query.data.data.user;
      }
    });
    return map;
  }, [usersQueries, userIds]);

  const totalPages = React.useMemo(() => {
    if (!ordersData?.total || !productsLimit) return 1;
    return Math.ceil(Number(ordersData.total) / Number(productsLimit));
  }, [ordersData, productsLimit]);

  const isLoading =
    ordersLoading ||
    usersQueries.some((query) => query.isLoading) ||
    usersQueries.some((query) => query.isError);

  const isErrorState =
    ordersError || usersQueries.some((query) => query.isError);

  if (isLoading) {
    return (
      <div className=" flex flex-col justify-center items-center">
        <div className="w-10 flex items-center justify-center text-nowrap">
          <Image
            className="animate-spin"
            src="/loading.svg"
            width={100}
            height={20}
            alt="Loading"
          />
          <p> در حال بارگذاری</p>
        </div>
      </div>
    );
  }
  if (isErrorState) {
    return <div className="text-red-500">خطا در بارگذاری داده‌ها</div>;
  }
  return (
    <section className="flex flex-col items-center justify-center ">
      <table className="w-full text-white border-collapse border-slate-300 shadow-md overflow-scroll rounded-lg">
        <thead className="h-6">
          <tr className="bg-white text-center text-gray-800">
            <th className="h-12">عملیات</th>
            <th>زمان سفارش</th>
            <th>مجموع مبلغ</th>
            <th>نام کاربر</th>
          </tr>
        </thead>
        <tbody className="text-center bg-base text-gray-900 font-semibold">
          {ordersData?.data?.orders
            .filter((order: IOrder) => !order.deliveryStatus)
            .map((order: IOrder) =>  (
              <tr
                className="even:bg-second hover:even:bg-white cursor-pointer text-center"
                key={order._id}
              >
                <td className="h-12">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  >
                    بررسی سفارش
                  </button>
                </td>
                <td className="h-12">
                  {new Date(order.createdAt).toLocaleString("fa-IR")}
                </td>
                <td className="h-12">
                  {order.totalPrice.toLocaleString("ar-EG")}
                </td>
                <td className="h-12">
                  {usersMap[order.user]
                    ? `${usersMap[order.user].firstname} ${
                        usersMap[order.user].lastname
                      }`
                    : "نامشخص"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="w-full flex justify-center items-center pt-10 gap-3">
        <Link
          href={`/admin/orders/awaiting?${new URLSearchParams({
            page: String(page - 1 < 1 ? 1 : page - 1),
          })}`}
        >
          <button
            className={classNames(
              "px-2 py-1 text-white disabled:bg-slate-500",
              "bg-base hover:bg-white hover:text-gray-700 rounded-xl"
            )}
            disabled={page - 1 < 1}
          >
            قبلی
          </button>
        </Link>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((el) => (
          <Link
            key={el}
            href={`/admin/orders/awaiting?${new URLSearchParams({
              page: String(el),
            })}`}
          >
            <span
              className={`cursor-pointer px-2 py-1 hover:bg-white ${
                el === page ? "bg-gray-300 font-bold" : ""
              }`}
            >
              {el}
            </span>
          </Link>
        ))}
        <Link
          href={`/admin/orders/awaiting?${new URLSearchParams({
            page: String(page + 1 > totalPages ? page : page + 1),
          })}`}
        >
          <button
            className={classNames(
              "px-2 py-1 text-white disabled:bg-slate-500",
              "bg-base hover:bg-white hover:text-gray-700 rounded-xl"
            )}
            disabled={page + 1 > totalPages}
          >
            بعدی
          </button>
        </Link>
      </div>
    </section>
  );
};
