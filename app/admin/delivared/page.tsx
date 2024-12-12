"use client";
import { Suspense,useMemo  } from "react";
import { useSearchParams } from "next/navigation";
import { DeliveredList } from "@/components/admin/order/DeliveredList";

const DelivaredPage: React.FC = () => {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");

  const currentPage = useMemo(() => {
    const parsed = parseInt(pageParam || "1", 10);
    return isNaN(parsed) || parsed < 1 ? 1 : parsed;
  }, [pageParam]);
  return (
      <Suspense fallback={<div>در حال بارگذاری...</div>}>
        <DeliveredList page={currentPage} />
      </Suspense>
  );
};
export default DelivaredPage;
