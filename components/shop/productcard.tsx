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
    <Link className="" href={`/shop/product/${_id}`}>
      <section className=" flex items-center justify-start text-textColor shadow-lg hover:text-gray-800 gap-x-5 rounded-lg bg-base hover:bg-white h-48">
        <Image
          className="p-2 object-cover"
          src={`http://localhost:8000/images/products/images/${images[0]}`}
          width={200}
          height={200}
          alt="Picture of the author"
        />
        <div className="flex flex-col items-start justify-center  h-full p-4">
          <p className="font-semibold">{name}</p>
          <p>{price.toLocaleString("ar-EG")}</p>
        </div>
      </section>
    </Link>
  );
};
