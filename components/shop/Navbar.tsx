"use client";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [hiddenMenu, sethiddenMenu] = useState(true);
  return (
    <nav className="bg-base px-6 ">
      <div className="container mx-auto flex item-center justify-between max-w-[1400px]">
        <div className="flex">
          <div className="hidden sm:flex sm:flex-col sm:items-center">
            <Image
              src="/logo_prev_ui.png"
              width={80}
              height={18}
              alt="Picture of the author"
            />
          </div>
          {/*  */}
          <div className="flex items-center justify-center text-textColor sm:hidden">
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
              <div className="flex items-center justify-start gap-x-1">
                <Link className="hover:underline" href="/shop/checkout/cart">
                  سبد خرید
                </Link>
                <FaShoppingCart />
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
            className={`bg-white min-h-screen absolute z-50 top-16 text-gray-900  left-0  w-full ${
              hiddenMenu ? "hidden" : ""
            }`}
          >
            <div className="flex flex-col items-end  gap-y-5 pl-10 pb-6 pt-6 text-{16px} font-semibold">
              <div className="flex items-center justify-end gap-x-2">
                <Link className="hover:underline" href="/cart">
                  سبد خرید
                </Link>
                <FaShoppingCart />
              </div>
              <div className="flex items-center justify-end gap-x-2">
                <Link className="hover:underline" href="/user">
                  کاربر
                </Link>
                <FaUser />
              </div>
              <div className="flex items-center justify-end gap-x-2">
                <Link className="hover:underline" href="/admin">
                  ادمین
                </Link>
                <RiAdminFill />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center text-textColor">
          <h1 className="font-bold text-center sm:text-3xl">پیتزا نوشا</h1>
        </div>
        <div className="flex items-center justify-center">
          <div className="hidden sm:flex sm:items-center sm:justify-center text-textColor">
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
              <div className="flex items-center justify-start gap-x-1">
                <Link className="hover:underline" href="/shop/checkout/cart">
                  سبد خرید
                </Link>
                <FaShoppingCart />
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
            className={`bg-white min-h-screen absolute z-50 top-16 text-gray-900  left-0  w-full ${
              hiddenMenu ? "hidden" : ""
            }`}
          >
            <div className="flex flex-col items-start  gap-y-5 pr-5 pb-6 pt-6 text-{16px} font-semibold">
              <div className="flex items-center justify-end gap-x-2">
                <FaShoppingCart />
                <Link className="hover:underline" href="/cart">
                  سبد خرید
                </Link>
              </div>
              <div className="flex items-center justify-end gap-x-2">
                <FaUser />
                <Link className="hover:underline" href="/user">
                  کاربر
                </Link>
              </div>
              <div className="flex items-center justify-end gap-x-2">
                <RiAdminFill />
                <Link className="hover:underline" href="/admin">
                  ادمین
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center sm:hidden">
            <Image
              src="/logo_prev_ui.png"
              width={80}
              height={18}
              alt="Picture of the author"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
