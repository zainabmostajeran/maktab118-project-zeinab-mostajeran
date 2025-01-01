"use client";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/Hook";
import {
  fetchCart,
  updateItemQuantity,
  removeItemFromCart,
} from "@/redux/slices/cartSlice";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";


const ShoppingCart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cart, status } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCart());
    }
  }, [status, dispatch]);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    dispatch(updateItemQuantity({ productId: id, newQuantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <section className="px-24 py-4 ">
      <div className="flex flex-col py-4 px-4 gap-y-6">
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="flex-grow bg-base rounded-lg p-7">
            {cart.length === 0 ? (
              <p className="text-textColor">سبد خرید شما خالی است.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-8 border-b py-4 justify-between"
                >
                  <Image
                    className="p-2 object-cover"
                    src={`http://localhost:8000/images/products/images/${item.images[0]}`}
                    width={200}
                    height={200}
                    alt={item.name}
                  />
                  <div className="flex-grow space-y-5 text-textColor">
                    <p className="font-semibold">{item.name}</p>
                    <p>{item.price.toLocaleString("ar-EG")} تومان</p>
                  </div>
                  <input
                    type="number"
                    min="1"
                    value={item.cartQuantity}
                    onChange={(e) =>
                      handleQuantityChange(item._id, Number(e.target.value))
                    }
                    className="w-16 border border-gray-300 rounded-md text-center"
                  />
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-textColor"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex item-center">
            <p className="font-bold">  جمع کل : </p>
            <p className="font-bold">{total.toLocaleString("ar-EG")} تومان</p>
          </div>
          <Link href="/shop/cart">
            <button className="rounded-lg px-6 py-1 bg-textColor font-bold">
              نهایی کردن سبد خرید
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
