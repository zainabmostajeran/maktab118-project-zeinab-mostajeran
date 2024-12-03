"use client";

import React from "react";
import Link from "next/link";
import { productsLimit } from "@/utils/config";
import { getProducts } from "@/apis/services/products";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { classNames } from "@/utils/classname";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  thumbnail: string;
}

interface ProductsResponse {
  status: string;
  page: number | null;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    products: Product[];
  };
}

export const ProductList: React.FC<{ page: number }> = ({ page }) => {
  const {
    data: productData,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery<ProductsResponse, Error>({
    queryKey: ["get-product", page],
    queryFn: () =>
      getProducts({
        page: String(page),
        limit: String(productsLimit),
      }),
  });

  const totalPages = productData
    ? Math.ceil(productData.total / productsLimit)
    : 1;

  React.useEffect(() => {
    if (isSuccess && productData) {
      console.log("Fetch successful", productData);
    }
  }, [isSuccess, productData]);

  React.useEffect(() => {
    if (isError) {
      console.error("Something went wrong", error);
    }
  }, [isError, error]);

  return (
    <section className="flex flex-col items-center justify-center py-6">
      {!isLoading ? (
        <table className="w-full text-white border-collapse border-slate-300 shadow-md overflow-scroll">
          <thead>
            <tr>
              <th className="bg-base">Actions</th>
              <th className="bg-base">تصویر</th>
              <th className="bg-base">نام کالا</th>
              <th className="bg-base">دسته بندی</th>
            </tr>
          </thead>
          <tbody className="even:bg-white text-center text-gray-600 border-collapse border border-slate-300">
            {productData?.data?.products?.map((item: Product) => (
              <tr key={item._id}>
                <td>
                  <div className="flex space-x-2">
                    <button className="bg-base px-2 py-1 rounded">
                      ویرایش
                    </button>
                    <button className="bg-red-500 px-2 py-1 rounded">
                      حذف
                    </button>
                  </div>
                </td>
                <td>
                  <Image
                    src={`/images/${item.thumbnail}`}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-right">Loading...</p>
      )}
      <div className="w-full flex justify-center pt-10 gap-5">
        {/* Previous Button */}
        <Link
          href={
            `?` +
            new URLSearchParams({
              page: String(page > 1 ? page - 1 : 1),
            })
          }
        >
          <button
            className={classNames(
              "px-2 py-1 text-white disabled:bg-slate-500",
              "bg-base hover:bg-white hover:text-gray-700 rounded-xl"
            )}
            disabled={page <= 1}
          >
            Previous
          </button>
        </Link>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (el) => (
            <Link
              href={`/?page=${el}`}
              key={el}
              className={`cursor-pointer px-2 py-1 hover:bg-white ${
                el === page ? "bg-gray-300" : ""
              }`}
            >
              {el}
            </Link>
          )
        )}

        {/* Next Button */}
        <Link
          href={
            `?` +
            new URLSearchParams({
              page: String(page < totalPages ? page + 1 : totalPages),
            })
          }
        >
          <button
            className={classNames(
              "px-2 py-1 text-white disabled:bg-slate-500",
              "bg-base hover:bg-white hover:text-gray-700 rounded-xl"
            )}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </Link>
      </div>
    </section>
  );
};
