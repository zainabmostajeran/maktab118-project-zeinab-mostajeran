import Image from "next/image";
import Link from "next/link";
import { classNames } from "@/utils/classname";

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div
      className={classNames(
        "border border-slate-200 shadow-md space-y-2",
        "bg-white px-5 py-4 rounded-xl transition",
        "hover:scale-105 hover:cursor-pointer ease-in-out"
      )}
    >
      <div className="w-full max-w-[620px] h-5 rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="w-full max-w-[120px] h-5 rounded-lg bg-slate-300 animate-pulse"></div>
    </div>
  );
};

export const ProductCard: React.FC<IProducts> = ({
  images,
  name,
  price,
  _id,
}) => {
  return (
    <Link  href={`/shop/product/${_id}`}>
      <section className="flex items-center p-2 gap-x-6 justify-center text-textColor shadow-lg hover:text-gray-800 rounded-lg bg-base hover:bg-white hover:shadow-sm hover:shadow-slate-400 hover:border-slate-700  h-48">
        <Image
          className="rounded-lg  sm:object-cover object-contain"
          src={`http://localhost:8000/images/products/images/${images[0]}`}
          width={150}
          height={150}
          alt="Picture of the author"
        />
        <div className="flex flex-col items-center justify-center gap-y-5 h-full ">
          <p className="font-semibold">{name}</p>
          <p>{price.toLocaleString("ar-EG")} تومان</p>
          <button className="hidden sm:block bg-textColor text-gray-800 rounded-lg px-2 py-1 hover:bg-textColor text-sm text-nowrap">افزودن به سبد خرید</button>
        </div>
      </section>
    </Link>
  );
};
