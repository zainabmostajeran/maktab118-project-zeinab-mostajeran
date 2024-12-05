import { Suspense } from "react";
import { AwaitingList } from "@/components/admin/order/Awaitinglist";
const AwaitingPage: React.FC<{ page: number }> = ({ page }) => {
  return (
    <section className="flex flex-col min-h-screen bg-second">
    
      <Suspense>
        <AwaitingList page={page} />
      </Suspense>
    </section>
  );
};

export default AwaitingPage;
