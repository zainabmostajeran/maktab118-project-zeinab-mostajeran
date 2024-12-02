import NavbarAdmin from "../../components/admin/NavbarAdmin";
import Footer from "../../components/admin/Footer";
import SideNavbar from "@/components/admin/SideNavbar";
interface IAuthLayout {
  children: React.ReactNode;
}
const AdminLayout: React.FC<IAuthLayout> = ({ children }) => {
  return (
    <div className="bg-second">
      <NavbarAdmin />
      <div className="flex min-h-screen">
        <SideNavbar />
        <div className="pt-4 sm:p-8 w-full">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
