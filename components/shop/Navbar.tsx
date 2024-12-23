"use client";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import Image from "next/image";
import { useAppSelector } from "@/redux/Hook";

const Navbar: React.FC = () => {
  const [hiddenMenu, sethiddenMenu] = useState(true);
  const [cartDropdown, setCartDropdown] = useState(false);
  const cartCount = useAppSelector((state) => state.cart.cart);

  return (
    <nav className="bg-base px-6 ">
      <div className="container mx-auto flex item-center justify-between max-w-[1400px]">
        <div className="flex flex-col items-center">
          <Image src="/logo_prev_ui.png" width={80} height={18} alt="Logo" />
        </div>
        <div className="flex items-center justify-center text-textColor">
          <h1 className="font-bold text-center sm:text-3xl">پیتزا نوشا</h1>
        </div>
        <div className="flex items-center justify-center text-textColor">
          <div className="hidden sm:flex gap-x-2 md:flex md:gap-x-8 items-center justify-center">
            <div className="flex items-center justify-start gap-x-1">
              <Link className="hover:underline" href="/auth/login/admin">
                ادمین
              </Link>
              <RiAdminFill />
            </div>
            <div className="flex items-center justify-start gap-x-1">
              <Link className="hover:underline" href="/auth/login">
                کاربر
              </Link>
              <FaUser />
            </div>
            <div className="flex items-center justify-start gap-x-1 relative">
              <Link
                href="/shop/checkout/cart"
                className="hover:underline flex items-center"
                onClick={() => setCartDropdown(!cartDropdown)}
              >
                سبد خرید
              </Link>
              <FaShoppingCart />
              {cartCount.length > 0 && (
                <span className="absolute top-[-10px] right-[-10px] inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {cartCount.length}
                </span>
              )}
              {cartDropdown && (
                <div className="absolute top-10 left-0 bg-white shadow-lg rounded-md z-50">
                  <ul className="px-10 py-8 space-y-4 w-full">
                    {cartCount.map((item) => (
                      <li
                        key={item._id}
                        className="flex justify-between items-center gap-x-6 py-2 w-full"
                      >
                        <p className="text-gray-800 text-nowrap">{item.name}</p>
                        <p className="text-red-600 text-nowrap">
                          {item.cartQuantity.toLocaleString("ar-EG")} عدد
                        </p>
                      </li>
                    ))}
                    <li className="text-center">
                      <Link
                        href="/shop/checkout/cart"
                        className="bg-textColor text-gray-800 hover:underline rounded-lg px-6 text-nowrap py-1"
                      >
                        مشاهده سبد خرید
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div
            onClick={() => sethiddenMenu(!hiddenMenu)}
            className="block sm:hidden"
          >
            <IoMenu />
          </div>
        </div>
        <div
          className={`bg-white min-h-screen absolute z-50 top-16 text-gray-900 left-0 w-full ${
            hiddenMenu ? "hidden" : ""
          }`}
        >
          <div className="flex flex-col items-end gap-y-5 pl-10 pb-6 pt-6 text-{16px} font-semibold">
            <div className="flex items-center justify-end gap-x-2 ">
              <Link className="hover:underline" href="/shop/checkout/cart">
                سبد خرید
              </Link>
              <FaShoppingCart />
            </div>
            <div className="flex items-center justify-end gap-x-2">
              <Link className="hover:underline" href="/auth/login">
                کاربر
              </Link>
              <FaUser />
            </div>
            <div className="flex items-center justify-end gap-x-2">
              <Link className="hover:underline" href="/auth/login/admin">
                ادمین
              </Link>
              <RiAdminFill />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
