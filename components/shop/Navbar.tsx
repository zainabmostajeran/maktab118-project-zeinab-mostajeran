"use client";
import Link from "next/link";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/Hook";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useLogout } from "@/apis/mutation/logout";
import { fetchCart } from "@/redux/slices/cartSlice";

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [hiddenMenu, setHiddenMenu] = useState(true);
  const [cartDropdown, setCartDropdown] = useState(false);
  const { cart, status } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCart());
    }
  }, [status, dispatch]);

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className="bg-base px-6">
      <div className="container mx-auto flex items-center justify-between max-w-[1400px]">
        <div className="flex flex-col items-center">
          <Image src="/logo_prev_ui.png" width={80} height={18} alt="Logo" />
        </div>
        <div className="flex items-center justify-center text-textColor">
          <h1 className="font-bold text-center sm:text-3xl">پیتزا نوشا</h1>
        </div>
        <div className="flex items-center justify-center text-textColor">
          <div className="hidden sm:flex gap-x-2 md:flex md:gap-x-8 items-center justify-center">
            {isAuthenticated ? (
              <>
                {user?.role === "ADMIN" && (
                  <div className="flex items-center justify-start gap-x-1">
                    <Link className="hover:underline" href="/admin">
                      ادمین
                    </Link>
                    <RiAdminFill />
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="hover:underline flex items-center bg-transparent border-none cursor-pointer"
                >
                  خروج
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
            <div className="flex items-center justify-start gap-x-1 relative">
              <button
                className="hover:underline flex items-center bg-transparent border-none cursor-pointer"
                onClick={() => setCartDropdown(!cartDropdown)}
              >
                سبد خرید
              </button>
              <FaShoppingCart />
              {cart.length > 0 && (
                <span className="absolute top-[-10px] right-[-10px] inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {cart.length}
                </span>
              )}
              {cartDropdown && (
                <div className="absolute top-10 left-0 bg-white shadow-lg rounded-md z-50">
                  <ul className="px-10 py-8 space-y-4 w-full">
                    {cart.length > 0 ?(
                      <>
                    {cart.map((item) => (
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
                    </>
                    ):(<li className="text-center text-gray-800 text-nowrap text-sm">سبد خرید خالی است</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div
            onClick={() => setHiddenMenu(!hiddenMenu)}
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
          <div className="flex flex-col items-end gap-y-5 pl-10 pb-6 pt-6 text-[16px] font-semibold">
            <div className="flex items-center justify-end gap-x-2 ">
              <Link className="hover:underline" href="/shop/checkout/cart">
                سبد خرید
              </Link>
              <FaShoppingCart />
            </div>
            {isAuthenticated ? (
              <>
                {user?.role === "ADMIN" && (
                  <div className="flex items-center justify-end gap-x-2">
                    <Link className="hover:underline" href="/admin/dashboard">
                      ادمین
                    </Link>
                    <RiAdminFill />
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="hover:underline flex items-center bg-transparent border-none cursor-pointer"
                >
                  خروج
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
