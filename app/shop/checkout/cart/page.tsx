"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/redux/Hook";
import { CartActions } from "@/redux/slices/cartSlice";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";

const ShoppingCart: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();
  const total = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <section className="flex flex-col py-4 px-4">
      <div className="flex flex-col lg:flex-row p-4 items-center justify-center">
        <div className="flex-grow">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.data.products._id}
                className="flex items-center gap-4 border-b py-4"
              >
                <Image
                  className="p-2 object-cover"
                  src={`http://localhost:8000/images/products/images/${item.data.products.images[0]}`}
                  width={200}
                  height={200}
                  alt="Picture of the author"
                />
                <div className="flex-grow">
                  <p className="font-semibold">{item.data.products.name}</p>
                  <p>${item.data.products.price}</p>
                </div>
                <input
                  type="number"
                  min="1"
                  value={item.data.products.quantity}
                  onChange={(e) =>
                    dispatch(
                      CartActions.updateQuantity({
                        id: item._id,
                        quantity: Number(e.target.value),
                      })
                    )
                  }
                  className="w-16 border border-gray-300 rounded-md text-center"
                />
                <button
                  onClick={() => dispatch(CartActions.remove(item._id))}
                  className="text-red-600"
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
          <p>جمع:</p>
          <p>{total.toFixed(2)}تومان</p>
        </div>
        <div>
          <button className="rounded-lg px-6 py-1 bg-base">
            نهایی کردن سبد خرید
          </button>
        </div>
      </div>
    </section>
  );
};
export default ShoppingCart;
