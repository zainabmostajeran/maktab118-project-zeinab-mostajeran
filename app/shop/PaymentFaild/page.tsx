import { FaRegTimesCircle } from "react-icons/fa";
import Link from "next/link";

const PaymentFaild: React.FC = () => {
  return (
    <section className="px-24 py-4">
      <div className="pt-32 pb-16 container mx-auto  w-1/2">
        <div className="flex flex-col gap-y-6 justify-center items-center">
          <div>
            <FaRegTimesCircle className="size-16 text-red-700" />
          </div>
          <p className="font-bold text-3xl">پرداخت شما با موفقیت انجام نشد</p>
          {/* <p>مبلغ پرداخت شده:</p> */}
          <Link href="/">
          <button className="bg-textColor px-4 py-1 hover:bg-base rounded-lg">متوجه شدم</button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default PaymentFaild;
