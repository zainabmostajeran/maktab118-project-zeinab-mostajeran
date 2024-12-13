"use client"
import { useState } from "react";
import {CategoryNav} from "@/components/shop/CategoryNav"
import {
  Pizza ,
  Drumstick ,
  Salad ,
} from "lucide-react";

 const ToggleCategory: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return(
        <CategoryNav
        isCollapsed={isCollapsed}
        links={[

          {
            icon: Pizza ,
            title: "پیتزا",
            variant: "ghost",
            href:"/shop/category/slugname",
          },
          {
            icon: Drumstick ,
            title: "فرنگی",
            variant: "ghost",
            href:"/shop/category/slugname"
          },

          {
            icon:Salad  ,
            title: "پیش غذا",
            variant: "ghost",
            href:"/shop/category/slugname"
          },

        ]}
      />
)}
export default ToggleCategory;