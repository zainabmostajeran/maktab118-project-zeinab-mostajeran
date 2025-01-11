// import NavbarAdmin from "../../components/admin/NavbarAdmin";
// import Footer from "../../components/admin/Footer";
import ToggleGroup from "@/components/admin/order/ToggleGroup";
import PageTitle from "@/components/admin/PageTitle";

interface IAuthLayout {
  children: React.ReactNode;
}
const OrderLayout: React.FC<IAuthLayout> = ({ children }) => {
  return (
    <div className=" bg-second mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between sm:px-16">
      <PageTitle className="px-2" title="سفارش ها" />
        <ToggleGroup />
      </div>
      <div className="sm:p-8 w-full">{children}</div>
    </div>
  );
};

export default OrderLayout;
