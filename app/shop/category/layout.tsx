import { SidebarCategory } from "@/components/shop/SidebarCategory";
import { MdOutlineArrowLeft } from "react-icons/md";

const CategoryLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <div className="px-4">
      <div className="text-right mt-3 flex gap-x-2  items-start justify-start px-36 ">
        <p className="font-bold text-xl">گروه انواع پیتزا</p>
        <MdOutlineArrowLeft className="size-5 border border-textColor" />
      </div>
      <div className="flex item-start w-full py-4 justify-start">
        <div>{children}</div>
        <div>
          <SidebarCategory />
        </div>
      </div>
    </div>
  );
};

export default CategoryLayout;
