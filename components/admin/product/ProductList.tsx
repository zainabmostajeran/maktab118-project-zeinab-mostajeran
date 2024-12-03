"use client";
import React from "react";
import Link from "next/link";
import { productsLimit } from "@/utils/config";
import { getProducts } from "@/apis/services/products";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { classNames } from "@/utils/classname";
import { getcategories } from "@/apis/services/category";

export const ProductList: React.FC<{ page: number }> = ({ page }) => {
  const product = useQuery({
    queryKey: ["get-product", page],
    queryFn: () =>
      getProducts({
        page: String(1),
        limit: String(productsLimit),
      }),
  });
  console.log(product.data?.data.products);
  // const category = useQuery({
  //   queryKey: ["get-category",page],
  //   queryFn: () =>
  //     getcategories({ page: String(1), limit: String(productsLimit) }),
  // });
  // console.log(category.data);

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
        <table className="w-full text-white shadow-lg overflow-scroll  rounded-full ">
          <thead>
            <tr className="bg-white text-gray-800 ">
              <th className="h-12"></th>
              <th>دسته بندی</th>
              <th>نام کالا</th>
              <th>تصویر</th>
            </tr>
          </thead>
          <tbody className=" text-center bg-base text-gray-800 font-semibold shadow-md">
            {product.data?.data.products?.map((item: any, index: number) => (
              <tr
                className="even:bg-[#BCB88A] hover:even:bg-white cursor-pointer"
                key={index}
              >
                <td>
                  <div className="flex gap-x-2 items-center justify-center text-gray-800">
                    <button className="bg-white px-2 py-1 hover:bg-slate-300 rounded-lg ">
                      ویرایش
                    </button>
                    <button className="bg-red-500 px-2 py-1 hover:bg-red-400 rounded-lg">
                      حذف
                    </button>
                  </div>
                </td>
                <td>{item.brand}</td>
                <td>{item.name}</td>
                <td>
                  <Image
                    src={item.images}
                    alt={item.name}
                    width={100}
                    height={20}
                  />
                </td>
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
      <div className="w-full flex justify-center items-center pt-10 gap-5">
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
            قبلی
          </button>
        </Link>
        {[1, 2, 3].map((el, index) => {
          return (
            <Link href="/admin/products">
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
            بعدی
          </button>
        </Link>
      </div>
    </section>
  );
};
