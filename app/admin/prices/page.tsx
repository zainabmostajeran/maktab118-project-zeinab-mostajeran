import PageTitle from "@/components/admin/PageTitle";
import { Suspense } from "react";
import { PriceList } from "@/components/admin/prices/PriceList";

const PricesPage: React.FC<{page:number}> = ({page}) => {
  return (
    <section className="px-6">
      <div className=" flex justify-between items-center px-4">
        
        <button className="bg-white px-3 py-1 sm:px-8 sm:py-2 rounded-md  font-bold">
          ذخیره
        </button>
        <PageTitle title="موجودی وقیمت ها" />
      </div>
      <Suspense>
        <PriceList page={page} />
      </Suspense>
    </section>
  );
};

export default PricesPage;
