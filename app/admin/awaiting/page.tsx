"use client";
import { Suspense,useMemo  } from "react";
import { useSearchParams } from "next/navigation";
import { AwaitingList } from "@/components/admin/order/Awaitinglist";

const AwaitingPage: React.FC = () => {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");

  const currentPage = useMemo(() => {
    const parsed = parseInt(pageParam || "1", 10);
    return isNaN(parsed) || parsed < 1 ? 1 : parsed;
  }, [pageParam]);
  return (
      <Suspense fallback={<div>در حال بارگذاری...</div>}>
        <AwaitingList page={currentPage} />
      </Suspense>
  );
};

export default AwaitingPage;
