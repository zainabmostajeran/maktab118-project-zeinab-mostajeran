import PageTitle from "@/components/admin/PageTitle";
const PricesPage: React.FC = () => {
  return (
    <section className="px-6">
      <div className=" flex justify-between items-center">
        <PageTitle title="موجودی وقیمت ها" />
        <button className="bg-white px-3 py-1 sm:px-8 sm:py-2 rounded-md  font-bold">
          ذخیره
        </button>
      </div>
    </section>
  );
};

export default PricesPage;
