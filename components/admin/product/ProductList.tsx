"use client";
import React from "react";
import Link from "next/link";
import { productsLimit } from "@/utils/config";
import { getProducts } from "@/apis/services/products";
import { useQuery } from "@tanstack/react-query";

export const ProductList: React.FC<{ page: number }> = ({ page }) => {
  const product = useQuery({
    queryKey: ["get-product", page],
    queryFn: () =>
      getProducts({
        skip: String(page * productsLimit - productsLimit),
      }),
    // refetchOnWindowFocus: false,
  });
  console.log(product.data);

  React.useEffect(() => {
    if (product.isSuccess && product.data) {
      console.log("success");
    }
  }, [product.isSuccess, product.data]);

  React.useEffect(() => {
    if (!product.error || !product.isError) return;
    console.log("Something went wrong");
  }, [product.error, product.isError]);
  //   const totalPages = Math.max(Number(product.total) / Number(productsLimit));
  return !product.isLoading ? (
    <section className="flex flex-col items-center justify-center py-6">
      <table className="w-full text-white border-collapse border-slate-300 shadow-md overflow-scroll">
        <thead>
          <th className=" bg-base"></th>
          <th className=" bg-base">تصویر</th>
          <th className=" bg-base">نام کالا</th>
          <th className=" bg-base">دسته بندی</th>
        </thead>
        <tbody className="even:bg-white text-center text-gray-600 border-collapse border border-slate-300">
          <tr>
            <td>ojjj</td>
            <td>jjj</td>
            <td>jjj</td>
            <td className="py-3">
              <div className="flex gap-2  items-center justify-center">
                <button className="bg-base text-white px-2 py-1 rounded-lg hover:bg-second hover:text-slate-800">
                  ویرایش
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-400 hover:text-slate-800">
                  حذف
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  ) : (
    <p>Is Loading...</p>
  );
  //   <div className="w-full flex justify-center pt-10 gap-5">
  //     <Link
  //       href={
  //         `?` +
  //         new URLSearchParams({
  //           page: String(page - 1 < 1 ? page : page - 1),
  //         })
  //       }
  //     >
  //       <button
  //         className={classNames(
  //           "px-4 py-2 text-white font-semibold disabled:bg-slate-500",
  //           "bg-slate-800 hover:bg-slate-600 rounded-xl"
  //         )}
  //         disabled={page - 1 < 1}
  //       >
  //         Previous
  //       </button>
  //     </Link>
  //     <Link
  //       href={
  //         `?` +
  //         new URLSearchParams({
  //           page: String(page + 1 > totalPages ? page : page + 1),
  //         })
  //       }
  //     >
  //       <button
  //         className={classNames(
  //           "px-4 py-2 text-white font-semibold disabled:bg-slate-500",
  //           "bg-slate-800 hover:bg-slate-600 rounded-xl"
  //         )}
  //         disabled={page + 1 > totalPages}
  //       >
  //         Next
  //       </button>
  //     </Link>
  //   </div>
};
