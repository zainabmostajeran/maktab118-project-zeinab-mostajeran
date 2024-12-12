import Navbar from "../components/shop/Navbar";
import Footer from "../components/shop/Footer";
import { CarouselPlugin } from "../components/shop/Mycarousel";
import ToggleCategory from "../components/shop/ToggleCategory";
import { MdOutlineArrowLeft } from "react-icons/md";
import { PizzaCategory } from "@/components/shop/PizzaCategory";
import { FarangiCategory } from "@/components/shop/FarangiCategory";
import { AppitizerCategory } from "../components/shop/AppitizerCategory";
import Link from "next/link";


const Home: React.FC = () => {
  return (
    <section>
      <Navbar />
      <div className="container mx-auto max-w-[1400px]  bg-second">
        <div className=" flex flex-col items-center justify-center bg-slate-900 text-textColor text-md font-semibold w-full h-14">
          به فروشگاه پیتزا نوشا خوش آمدید
        </div>
        <div className="flex justify-between items-center px-4 py-4 text-slate-900">
          {/* toggle */}
          <ToggleCategory />
          <div className="relative text-white ">
         
            <input
              type="text"
              name="search"
              id="search-input"
              className="block cursor-pointer  text-gray-900  text-right px-8 w-full rounded border py-1.5 shadow-sm ring-slate-300  sm:text-sm sm:leading-6"
              placeholder="جستجو"
            />
            <div className="absolute inset-y-0 px-3 right-0 text-white  flex items-center pointer-events-none">
              <img src="input-prefix.svg" alt="" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <CarouselPlugin />
        </div>
        <div className="flex flex-col gap-y-2 px-4 py-4">
          <div className="text-right">
            <div className="flex flex-col items-start">
              <div className="flex items-center justify-start gap-2">
                <Link href="/shop/category">
                  <p className="text-right font-bold text-2xl py-3">
                    گروه انواع پیتزا
                  </p>
                </Link>
                <MdOutlineArrowLeft className="size-5 border border-textColor" />
              </div>
            </div>
            <div>
              <PizzaCategory />
            </div>
          </div>
          <div className="text-right py-4">
            <div className="flex flex-col items-start">
              <div className="flex items-center justify-start gap-2">
                <p className="text-right font-bold text-2xl">
                  گروه انواع فرنگی
                </p>
                <MdOutlineArrowLeft className="size-5 border border-textColor" />
              </div>
            </div>
            <div>
              <FarangiCategory page={1}/>
            </div>
          </div>
          <div className="text-right">
            <div className="flex flex-col items-start">
              <div className="flex items-center justify-start gap-2">
                <p className="text-right font-bold text-2xl">
                  گروه انواع پیش غذا
                </p>
                <MdOutlineArrowLeft className="size-5 border border-textColor" />
              </div>
            </div>
            <div>
              <AppitizerCategory />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};
export default Home;
