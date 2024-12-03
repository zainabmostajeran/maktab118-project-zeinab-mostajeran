// import NavbarAdmin from "../../components/admin/NavbarAdmin";
// import Footer from "../../components/admin/Footer";
import ToggleGroup from "@/components/admin/order/ToggleGroup";
import PageTitle from "@/components/admin/PageTitle";

interface IAuthLayout {
  children: React.ReactNode;
}
const OrderLayout: React.FC<IAuthLayout> = ({ children }) => {
  return (
    <div>
      <div className="flex flex-col min-h-screen bg-second">
        <div className="flex justify-between px-16">
          <ToggleGroup />
          <PageTitle title="سفارش ها" />
        </div>
        <div className="pt-4 sm:p-8 w-full">{children}</div>
      </div>
    </div>
  );
};

export default OrderLayout;
