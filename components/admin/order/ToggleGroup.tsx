"use client"
import { useState } from "react";
import {NavToggle} from "@/components/admin/order/NavToggle"

 const ToggleGroup: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return(
        <NavToggle
        isCollapsed={isCollapsed}
        links={[
          {
            title: "همه",
            variant: "default",
            href:"/admin/orders/all"
          },
          {
            title: "درانتظار ارسال",
          
            variant: "ghost",
            href:"/admin/orders/awaiting"
          },
          {
            title: "تحویل شده",
            variant: "ghost",
            href:"/admin/orders/delivered"
          },
        ]}
      />
)}
export default ToggleGroup;
