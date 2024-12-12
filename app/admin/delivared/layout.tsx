// import NavbarAdmin from "../../components/admin/NavbarAdmin";
// import Footer from "../../components/admin/Footer";
import ToggleGroup from "@/components/admin/order/ToggleGroup";
import PageTitle from "@/components/admin/PageTitle";

interface IAuthLayout {
  children: React.ReactNode;
}
const OrderLayout: React.FC<IAuthLayout> = ({ children }) => {
  return (
    <div className=" bg-second">
      <div className="flex items-center justify-between px-16">
      <PageTitle title="سفارش ها" />
        <ToggleGroup />
      </div>
      <div className="sm:p-8 w-full">{children}</div>
    </div>
  );
};

export default OrderLayout;
