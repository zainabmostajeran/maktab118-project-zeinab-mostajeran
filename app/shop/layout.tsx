import Navbar from "@/components/shop/Navbar";
import Footer from "@/components/shop/Footer";
const CategoryLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <section>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </section>
  );
};

export default CategoryLayout;
