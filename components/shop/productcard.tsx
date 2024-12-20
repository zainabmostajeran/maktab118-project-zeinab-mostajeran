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
    <Link className="p-0" href={`/shop/product/${_id}`}>
      <section className="flex items-center gap-x-4 justify-start text-textColor shadow-lg hover:text-gray-800 rounded-lg bg-base hover:bg-white hover:shadow-sm hover:shadow-slate-400 hover:border-slate-700  h-48">
        <Image
          className="rounded-lg p-1 object-cover"
          src={`http://localhost:8000/images/products/images/${images[0]}`}
          width={200}
          height={200}
          alt="Picture of the author"
        />
        <div className="flex flex-col items-center justify-center  h-full py-4">
          <p className="font-semibold">{name}</p>
          <p>{price.toLocaleString("ar-EG")}</p>
        </div>
      </section>
    </Link>
  );
};
