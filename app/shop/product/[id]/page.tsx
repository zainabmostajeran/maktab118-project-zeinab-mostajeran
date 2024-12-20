import { notFound } from "next/navigation";
import Image from "next/image";
import SingleProductClient from "./SingleProductClient";

const fetchProduct = async (id: string) => {
  const res = await fetch(`http://localhost:8000/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data;
};

export default async function SingleProductPage({
  params,
}: {
  params: { id: string };
}) {
  const productRes = await fetchProduct(params.id);
  if (!productRes) {
    notFound();
  }
  const product = productRes.data.product;

  return (
    <div className="flex justify-start items-start gap-x-10 py-10 px-4 shadow-lg">
      <div>
        <Image
          src={`http://localhost:8000/images/products/images/${product.images[0]}`}
          width={500}
          height={20}
          alt={product.name}
        />
      </div>
      <div className="flex flex-col gap-y-10 items-start justify-start">
        <p className="font-bold text-xl">{product.name}</p>
        <p className="text-lg font-semibold text-slate-500">
          {product.price.toLocaleString("ar-EG")} تومان
        </p>
        <p className="text-lg font-semibold">{product.description}</p>

        {/* Client Component for Cart Actions */}
        <SingleProductClient product={product} />
      </div>
    </div>
  );
}
