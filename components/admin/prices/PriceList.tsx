"use client";
import React from "react";
import Link from "next/link";
import { productsLimit } from "@/utils/config";
import { getProducts } from "@/apis/services/products";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { classNames } from "@/utils/classname";

export const PriceList: React.FC<{ page: number }> = ({ page }) => {
  const product = useQuery({
    queryKey: ["get-product", page],
    queryFn: () =>
      getProducts({
        page: String(1),
        limit: String(productsLimit),
      }),
  });
  const totalPages = Math.max(
    Number(product.data?.total) / Number(productsLimit)
  );

  React.useEffect(() => {
    if (product.isSuccess && product.data) {
      console.log("Fetch successful", product.data);
    }
  }, [product.isSuccess, product.data]);

  React.useEffect(() => {
    if (product.error || product.isError) {
      console.error("Something went wrong", product.error);
    }
  }, [product.error, product.isError]);

  return (
    <section className="flex flex-col items-center justify-center py-6">
      {!product.isLoading ? (
        <table className="w-full text-white border-collapse border-slate-300 shadow-md overflow-scroll">
          <thead className="h-6">
            <tr className="bg-white text-center text-gray-800">
              <th className="h-10">موجودی</th>
              <th className="h-10 text-center">قیمت</th>
              <th className="h-10 text-center">کالا</th>
            </tr>
          </thead>
          <tbody className="text-center bg-base text-gray-900 font-semibold">
            {product.data?.data.products.map((item: any, index: number) => (
              <tr
                className="even:bg-second hover:even:bg-white cursor-pointer text-center"
                key={index}
              >
                <td className="h-12">
                  <input
                    className="w-20  bg-transparent placeholder-slate-900 text-center "
                    type="number"
                    placeholder={item.quantity}
                  />
                </td>
                <td className="h-12">
                  <input
                    className="w-20 bg-transparent placeholder-slate-900 text-center"
                    type="number"
                    placeholder={item.price}
                  />
                </td>
                <td  className="text-center" >{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="w-10 flex item-center justify-center text-nowrap">
          <Image
            className="animate-spin"
            src="/loading.svg"
            width={100}
            height={20}
            alt="Picture of the author"
          />
          <p> درحال بارگذاری</p>
        </div>
      )}
      <div className="w-full flex justify-center pt-10 gap-5">
        <Link
          href={
            `?` +
            new URLSearchParams({
              page: String(page - 1 < 1 ? page : page - 1),
            })
          }
        >
          <button
            className={classNames(
              "px-2 py-1 text-white  disabled:bg-slate-500",
              "bg-base hover:bg-white hover:text-gray-700 rounded-xl"
            )}
            disabled={page - 1 < 1}
          >
            Previous
          </button>
        </Link>
        {[1, 2, 3].map((el, index) => {
          return (
            <Link href="/admin/orders">
              <span
                className="cursor-pointer px-2 py-1 hover:bg-white"
                key={index}
              >
                {el}
              </span>
            </Link>
          );
        })}
        <Link
          href={
            `?` +
            new URLSearchParams({
              page: String(page + 1 > totalPages ? page : page + 1),
            })
          }
        >
          <button
            className={classNames(
              "px-2 py-1 text-white  disabled:bg-slate-500",
              "bg-base hover:bg-white hover:text-gray-700  rounded-xl"
            )}
            disabled={page + 1 > totalPages}
          >
            Next
          </button>
        </Link>
      </div>
    </section>
  );
};
