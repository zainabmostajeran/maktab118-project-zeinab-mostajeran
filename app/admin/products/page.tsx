import PageTitle from "@/components/admin/PageTitle";
import { Suspense } from "react";
import { ProductList } from "@/components/admin/product/ProductList";
const ProductPage: React.FC<{page:number}> = ({page}) => {
  return (
    <section className="px-6">
      <div className="flex justify-between items-center">
        <PageTitle title="کالاها" />
        <button className="bg-white px-3 py-1 sm:px-8 sm:py-2 rounded-md  font-bold">
          افزودن کالا
        </button>
      </div>
      <Suspense>
        <ProductList page={page} />
      </Suspense>
    </section>
  );
};

export default ProductPage;
