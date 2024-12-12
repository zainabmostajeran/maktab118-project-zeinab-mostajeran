"use client";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import Image from "next/image";


const NavbarAdmin: React.FC = () => {
  // const { tokens} = useSelector(
  //   (state: RootState) => state.auth
  // );
  const [hiddenMenu, sethiddenMenu] = useState(true);
  // const {push}=useRouter();
  // const dispatch=useDispatch();
  // const HandleLogout=()=>{
  //   dispatch(logout());
  //   if(tokens!==null)
  //     removeSessionToken(tokens);
  //     push("/");
  // }
  return (
    <nav className="bg-base px-6 text-textColor">
      <div className="container mx-auto flex  justify-between max-w-[1400px]">
        <div className="flex items-center justify-center ">
          <div className="hidden sm:flex gap-x-2 md:flex md:gap-x-8 items-center justify-center">
            <div className="flex items-center justify-start gap-x-1">
              <ImExit />
              <Link className="hover:underline" href="/auth/login/admin">
                خروج
              </Link>
            </div>
            <div className="flex items-center justify-start gap-x-1">
              <FaHome />
              <Link className="hover:underline" href="/">
                خانه
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
          className={`bg-second h-full absolute z-50 top-6 left-0 w-full ${
            hiddenMenu ? "hidden" : ""
          }`}
        >
          <div className="flex flex-col  gap-y-4 pl-10 pb-6 pt-5 text-{16px} font-semibold">
            <div className="flex items-center justify-start gap-x-2">
              <FaHome />
              <Link className="hover:underline" href="/cart">
                خانه
              </Link>
            </div>
            <div className="flex items-center justify-start gap-x-2">
              <ImExit />
              <Link  className="hover:underline" href="/">
                خروج
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold sm:text-3xl">پنل مدیریت پیتزا نوشا</h1>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/logo_prev_ui.png"
            width={100}
            height={20}
            alt="Picture of the author"
          />{" "}
        </div>
      </div>
    </nav>
  );
};
export default NavbarAdmin;
