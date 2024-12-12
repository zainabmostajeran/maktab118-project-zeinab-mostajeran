"use client";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";


const Navbar: React.FC = () => {
  const [hiddenMenu, sethiddenMenu] = useState(true);
  return (
    <nav className="bg-base px-6 text-textColor">
      <div className="container mx-auto flex  justify-between max-w-[1400px]">
        <div className="flex items-center justify-center ">
          <div className="hidden sm:flex gap-x-2 md:flex md:gap-x-8 items-center justify-center">
            <div className="flex items-center justify-start gap-x-1">
              <FaShoppingCart />
              <Link className="hover:underline" href="/shop/checkout/cart">
                سبد خرید
              </Link>
            </div>
            <div className="flex items-center justify-start gap-x-1">
              <FaUser />
              <Link className="hover:underline" href="/auth/login">
                کاربر
              </Link>
            </div>
            <div className="flex items-center justify-start gap-x-1">
              <RiAdminFill />
              <Link className="hover:underline" href="/auth/login/admin">
                ادمین
              </Link>
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
          className={`bg-second h-full absolute z-50 top-16  left-0 w-full ${
            hiddenMenu ? "hidden" : ""
          }`}
        >
          <div className="flex flex-col  gap-y-4 pl-10 pb-6 pt-5 text-{16px} font-semibold">
            <div className="flex items-center justify-start gap-x-2">
              <FaShoppingCart />
              <Link className="hover:underline" href="/cart">
                سبد خرید
              </Link>
            </div>
            <div className="flex items-center justify-start gap-x-2">
              <FaUser />
              <Link className="hover:underline" href="/user">
                کاربر
              </Link>
            </div>
            <div className="flex items-center justify-start gap-x-2">
              <RiAdminFill />
              <Link className="hover:underline" href="/admin">
                ادمین
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold sm:text-3xl">پیتزا نوشا</h1>
        </div>
        <div className="flex flex-col items-center">
        <img className="w-16 sm:w-20 sm:h-20" src="logo_prev_ui.png" alt="logo" />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
