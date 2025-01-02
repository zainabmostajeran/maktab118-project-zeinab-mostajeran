import { GoIssueClosed } from "react-icons/go";
import Link from "next/link";

const PaymentSuccess: React.FC = () => {
  return (
    <section className="px-24 py-4">
      <div className="py-10 container mx-auto  w-1/2">
        <div className="flex flex-col gap-y-6 justify-center items-center">
            <GoIssueClosed className="size-16 text-green-700" />
          <p className="font-bold text-3xl">پرداخت شما با موفقیت انجام شد</p>
          {/* <p>مبلغ پرداخت شده:</p> */}
          <Link href="/">
          <button className="bg-textColor px-4 py-1 hover:bg-base rounded-lg">متوجه شدم</button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default PaymentSuccess;
