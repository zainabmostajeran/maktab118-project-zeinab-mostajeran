import { SidebarCategory } from "@/components/shop/SidebarCategory";

const CategoryLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <div className="px-4 py-6">
      <div className="flex item-start w-full py-4 justify-start">
        <div>
          <SidebarCategory />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default CategoryLayout;
