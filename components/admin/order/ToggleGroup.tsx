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
            href:"/admin",
          },
          {
            title: "درانتظار ارسال",
            variant: "ghost",
            href:"/admin/awaiting"
          },
          {
            title: "تحویل شده",
            variant: "ghost",
            href:"/admin/delivared"
          },
        ]}
      />
)}
export default ToggleGroup;
