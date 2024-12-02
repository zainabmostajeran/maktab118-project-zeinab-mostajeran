import PageTitle from "@/components/admin/PageTitle";
import ToggleGroup from "@/components/admin/order/ToggleGroup";
const OrderdPage: React.FC = () => {
  return (
    <section className="sm:px-6">
      <div className=" block text-center sm:flex sm:justify-between sm:items-center">
        <PageTitle title="سفارش ها" />
        <ToggleGroup/>
      </div>
    </section>
  );
};

export default OrderdPage;
