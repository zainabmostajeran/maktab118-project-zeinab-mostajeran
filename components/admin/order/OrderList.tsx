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
import Modal from "@/components/ui/Modal";
import { DeliverModal } from "@/components/admin/order/DeliverModal";

interface OrderListProps {
  page: number;
}
export const OrderList: React.FC<OrderListProps> = ({ page }) => {
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

  const userIds = React.useMemo(() => {
    if (!ordersData?.data?.orders) return [];
    const ids = ordersData.data.orders.map((order) => order.user);
    return Array.from(new Set(ids));
  }, [ordersData]);

  const usersQueries = useQueries({
    queries: userIds.map((id) => ({
      queryKey: ["user", id],
      queryFn: () => getUser({ id }),
      staleTime: 1000 * 60 * 60,
    })),
  });

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<IOrder | null>(null);

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

  const pageNumbers = React.useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }, [totalPages]);

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
    <section className="flex flex-col items-center justify-center py-2">
      <table className="w-full text-white shadow-lg rounded-lg">
        <thead className=" h-6">
          <tr className="bg-textColor text-center text-gray-800">
            <th>نام کاربر</th>
            <th>زمان سفارش</th>
            <th>مجموع مبلغ</th>
            <th className="h-12">عملیات</th>
          </tr>
        </thead>
        <tbody className="text-center bg-base text-gray-900 font-semibold">
          {ordersData?.data?.orders.map((order: IOrder) => (
            <tr
              className="even:bg-[#BCB88A] hover:even:bg-white cursor-pointer text-center"
              key={order._id}
            >
              <td className="h-12">
                {usersMap[order.user]
                  ? `${usersMap[order.user].firstname} ${
                      usersMap[order.user].lastname
                    }`
                  : "نامشخص"}
              </td>
              <td className="h-12">
                {new Date(order.createdAt).toLocaleString("fa-IR")}
              </td>
              <td className="h-12">
                {order.totalPrice.toLocaleString("ar-EG")}
              </td>
              <td className="h-12">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="px-1 text-sm  sm:text-base sm:px-2 py-1 bg-white hover:bg-textColor text-gray-800 rounded-lg"
                >
                  بررسی سفارش
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="w-full flex justify-center items-center pt-10 gap-3">
        {/* Previous Button */}
        <Link
          href={`/admin/orders?${new URLSearchParams({
            page: String(page - 1 < 1 ? 1 : page - 1),
          })}`}
        >
          <button
            className={classNames(
              "px-2 py-1 text-white disabled:bg-slate-500",
              "bg-base  hover:bg-[#BCB88A] hover:text-gray-700 rounded-lg"
            )}
            disabled={page - 1 < 1}
          >
            صفحه قبل
          </button>
        </Link>

        {/* Page Numbers */}
        {[1, 2, 3, 4].map((el) => (
          <Link
            key={el}
            href={`/admin/?${new URLSearchParams({
              page: String(el),
            })}`}
          >
            <span
              className={`cursor-pointer px-2 py-1 hover:bg-white ${
                el === page ? "bg-gray-300 font-bold" : ""
              }`}
            >
              {el.toLocaleString("ar-EG")}
            </span>
          </Link>
        ))}

        {/* Next Button */}
        <Link
          href={`/admin/?${new URLSearchParams({
            page: String(page + 1 > totalPages ? page : page + 1),
          })}`}
        >
          <button
            className={classNames(
              "px-2 py-1 text-white disabled:bg-slate-500",
              "bg-base  hover:bg-[#BCB88A] hover:text-gray-700 rounded-lg"
            )}
            disabled={page + 1 > totalPages}
          >
            صفحه بعد
          </button>
        </Link>
      </div>
      {selectedOrder && (
        <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)}>
          <DeliverModal
            order={selectedOrder}
            user={usersMap[selectedOrder.user]}
            onClose={() => setSelectedOrder(null)}
          />
        </Modal>
      )}
    </section>
  );
};
