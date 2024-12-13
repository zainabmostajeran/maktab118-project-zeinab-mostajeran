"use client"
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/apis/services/products";
import { productsLimit } from "@/utils/config";
import { ProductCard } from "@/components/shop/productcard";
import Image from "next/image";

 export const PizzaCategory:React.FC<{ page: number }>=({page})=> {

const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
    error: productsErrorData,
  } = useQuery({
    queryKey: ["get-product", page],
    queryFn: () =>
      getProducts({
        page: String(page),
        limit: String(productsLimit),
      }),
  });
  if (productsLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="w-10 flex items-center justify-center text-nowrap">
          <Image
            className="animate-spin"
            src="/loading.svg"
            width={100}
            height={20}
            alt="Loading"
          />
          <p> در حال بارگذاری...</p>
        </div>
      </div>
    );
  }
  
  if (productsError) {
    return <div className="text-red-500">خطا در بارگذاری داده‌ها</div>;
  }
  return(
    <div className="grid grid-cols-3 items-center grid-rows-3 justify-center gap-2 py-4">
    {productsData?.data?.products
    .filter((item) => item.category==="6750b32eaa6d604a6ccba4c6")
    .map((item) => (
      <div  key={item._id}>
        <ProductCard  {...item}/>
      </div>
    ))}
    </div>
  )
}