"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/Hook";
import { CartActions } from "@/redux/slices/cartSlice";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  description: string;
  brand: string;
}

const SingleProductClient: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const [cartQuantity, setCartQuantity] = useState<number>(1);

  const increment = () => setCartQuantity((q) => q + 1);
  const decrement = () => setCartQuantity((q) => (q > 1 ? q - 1 : 1));

  const addToCart = () => {
    const productExists = cart.find((item) => item._id === product._id);
    if (productExists) {
      toast.error("این محصول قبلا به سبد خرید اضافه شده");
      return;
    }
    dispatch(CartActions.add(product));
    toast.success("محصول با موفقیت به سبد خرید اضافه شد");
    setCartQuantity(1);
  };

  return (
    <div className="flex gap-x-3 items-center justify-center">
      <div className="flex items-center justify-center rounded-lg cursor-pointer bg-slate-500 text-white gap-x-6 py-1">
        <p onClick={increment} className="border-l-2 px-3">
          +
        </p>
        <p>{cartQuantity}</p>
        <p onClick={decrement} className="border-r-2 px-3">
          -
        </p>
      </div>
      <button
        onClick={addToCart}
        className="bg-base px-4 py-1 text-white rounded-lg"
      >
        افزودن به سبد خرید
      </button>
    </div>
  );
};

export default SingleProductClient;
