"use client"
import { notFound } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import SingleProductClient from "./SingleProductClient";

const fetchProduct = async (id: string) => {
  const res = await fetch(`http://localhost:8000/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data;
};

// Skeleton 
export const SingleProductSkeleton: React.FC = () => {
  return (
    <div className=" pt-[80px] block space-y-3 sm:flex justify-start items-start gap-x-10 py-10 px-4 shadow-lg animate-pulse">
      <div className="bg-gray-300 rounded-md w-[500px] h-[300px] mt-3" />

      <div className="flex flex-col gap-y-6 items-start justify-start w-full">
        <div className="bg-gray-300 rounded-md w-[200px] h-[24px]" />

        <div className="bg-gray-300 rounded-md w-[150px] h-[20px]" />

        <div className="bg-gray-300 rounded-md w-full h-[40px]" />

        <div className="bg-gray-300 rounded-md w-[120px] h-[40px]" />

        <div className="flex gap-x-2">
          <div className="bg-gray-300 rounded-md w-[100px] h-[100px]" />
        </div>
      </div>
    </div>
  );
};
export default function SingleProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const productRes = await fetchProduct(params.id);
      if (!productRes) {
        notFound();
      }
      setProduct(productRes.data.product);
      setLoading(false); 
    };
    fetchData();
  }, [params.id]);

  if (loading) {
    return <SingleProductSkeleton />; 
  }

  return (
    <div>
      {product ? (
        <div className="block  space-y-3 sm:flex justify-start items-start gap-x-10 py-24 px-4 shadow-lg">
          <div>
            <Image
              src={`http://localhost:8000/images/products/images/${product.images[0]}`}
              width={500}
              height={20}
              alt={product.name}
            />
          </div>
          <div className="flex flex-col gap-y-10 items-start justify-start">
            <p className="font-bold text-xl">{product.name}</p>
            <p className="text-lg font-semibold text-slate-500">
              {product.price.toLocaleString("ar-EG")} تومان
            </p>
            <p className="text-lg font-semibold">{product.description}</p>

            <SingleProductClient product={product} />
            <div className="flex">
              <Image
                src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                width={200}
                height={20}
                alt={product.name}
              />
            </div>
          </div>
        </div>
      ) : (
        <SingleProductSkeleton />
      )}
    </div>
  );
}