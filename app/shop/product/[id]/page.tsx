import { notFound } from "next/navigation";
import Image from "next/image";

const fetchProduct = async (id: string) => {
  const res = await fetch(`http://localhost:8000/api/products/${id}`);
  if (!res.ok) {
    return null; 
  }
  return res.json();
};

export default async function SingleProductPage({params,}: {params: { id: string }}) {
  const product = await fetchProduct(params.id);
  console.log(product.data.product);

  if (!product) {
    notFound();
  }
  return (
    <div className="flex justify-start items-start gap-x-10 bg-[rgb(188,184,138)] py-10 px-4">
      <div>
        <Image
          src={`http://localhost:8000/images/products/images/${product.data.product.images[0]}`}
          width={500}
          height={20}
          alt="Picture of the author"
        />
      </div>
      <div className="flex flex-col gap-y-10 items-start justify-start">
        <p className="font-bold text-xl">{product.data.product.name}</p>
        <p className="text-lg font-semibold text-slate-500">
          {product.data.product.price.toLocaleString("ar-EG")} تومان
        </p>
        <p className="text-lg font-semibold">{product.data.product.description}</p>
        <div className="flex gap-x-3 items-center justify-center">
          <div className="flex items-center justify-center rounded-lg cursor-pointer bg-slate-500 text-white  gap-x-6 py-1">
            <p className=" border-l-2 px-3">+</p>
            <p>0</p>
            <p className=" border-r-2  px-3">-</p>
          </div>
          <button className="bg-base px-4 py-1 text-white rounded-lg">
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </div>
  );
}
