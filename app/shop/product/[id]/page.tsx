"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/Hook";
import { CartActions } from "@/redux/slices/cartSlice";
import React from "react";

const fetchProduct = async (id: string) => {
  const res = await fetch(`http://localhost:8000/api/products/${id}`);
  if (!res.ok) {
    return null;
  }
  return res.json();
};

export default async function SingleProductPage({
  params,
}: {
  params: { id: string };
}) {
  // const [quantity, setQuantity] = React.useState<QuantityType>({
  //   0: 0,
  //   1: 0,
  //   2: 0,
  //   3: 0,
  //   4: 0,
  // });

  // const addToCart = (id: number) => {
  //   setQuantity((prevQuantity) => {
  //     const newQuantity = { ...prevQuantity, [id]: prevQuantity[id] + 1 };
  //     return newQuantity;
  //   });
  // };

  // const removeFromCart = (id: number) => {
  //   setQuantity((prevQuantity) => {
  //     if (prevQuantity[id] > 0) {
  //       const newQuantity = { ...prevQuantity, [id]: prevQuantity[id] - 1 };
  //       return newQuantity;
  //     }
  //     return prevQuantity;
  //   });
  // };
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) =>
    state.cart.cart.find((item) => item._id === product.id)
  );
  const product = await fetchProduct(params.id);
  console.log(product.data.product);

  if (!product) {
    notFound();
  }
  return (
    <div className=" block sm:flex sm:justify-start sm:items-start sm:gap-x-10  py-8 px-4">
      <div className="mb-3">
        <Image
          src={`http://localhost:8000/images/products/images/${product.data.product.images[0]}`}
          width={500}
          height={20}
          alt="Picture of the author"
        />
      </div>
      <div className="flex flex-col gap-y-10 items-start justify-start">
        <p className="font-bold text-xl">{product.data.product.name}</p>
        <p className="text-lg font-semibold text-slate-500">
          {product.data.product.price.toLocaleString("ar-EG")} تومان
        </p>
        <p className="text-lg font-semibold">
          {product.data.product.description}
        </p>
        <div className=" flex gap-x-4 items-center justify-center">
          <div className=" flex items-center justify-center rounded-lg cursor-pointer bg-slate-500 text-white  gap-x-6 py-1">
            <p className=" border-l-2 px-3">+</p>
            <p>{product.data.product.quantity}</p>
            <p className=" border-r-2  px-3">-</p>
          </div>
          <button
            onClick={() => dispatch(CartActions.add(product))}
            className="bg-base px-4 py-1 text-white rounded-lg"
          >
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </div>
  );
}
