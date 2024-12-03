import ToggleGroup from "@/components/admin/order/ToggleGroup";
import { Suspense } from "react";
import { OrderList } from "@/components/admin/order/OrderList";
const OrderdPage: React.FC<{ page: number }> = ({ page }) => {
  return (
    <section className="sm:px-6">
      <Suspense>
        <OrderList page={page} />
      </Suspense>
    </section>
  );
};

export default OrderdPage;
