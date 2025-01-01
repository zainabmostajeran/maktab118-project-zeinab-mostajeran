import { GoIssueClosed } from "react-icons/go";

const PaymentSuccess: React.FC = () => {
  return (
    <section className="px-24 py-4">
      <div className="py-10 container mx-auto  w-1/2">
        <div className="flex flex-col gap-y-5 justify-center items-center">
          <div>
            <GoIssueClosed />
          </div>
          ّ<p className="font-bold text-3xl">پرداخت شما با موفقیت انجام شد</p>
          <p>مبلغ پرداخت شده:</p>
          <button className="bg-textColor px-4 py-1">متوجه شدم</button>
        </div>
      </div>
    </section>
  );
};
export default PaymentSuccess;
