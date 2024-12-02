"use client"
import { useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import {Nav} from "@/components/ui/Nav"
import { Button } from "@/components/ui/button";

import {
  ShoppingCart,
  LayoutDashboard,
  ChevronRight,
  ChartCandlestick,
} from "lucide-react";
 const SideNavbar: React.FC = () => {

  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }
    return(
      <div className="relative min-w-[80px] border-r sm:px-6  pb-10 pt-24">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
        <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "کالاها",
            icon: LayoutDashboard,
            variant: "default",
            href:"/admin/products"
          },
          {
            title: "موجودی و قیمت ها ",
            icon:ChartCandlestick,
            variant: "ghost",
            href:"/admin/prices"
          },
          {
            title: "سفارش ها",
            icon: ShoppingCart,
            variant: "ghost",
            href:"/admin/orders"
          },
        ]}
      />
      </div>
)}
export default SideNavbar;
