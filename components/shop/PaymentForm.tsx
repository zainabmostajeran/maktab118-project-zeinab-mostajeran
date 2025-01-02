"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/admin/Input";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/Hook";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/slices/cartSlice";
import { toast } from "react-toastify";
import { PaymentSchema, PaymentSchemaType } from "@/validation/payment";

export const PaymentForm: React.FC = () => {
  const { cart, status } = useAppSelector((state) => state.cart);
  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.cartQuantity;
  }, 0);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentSchemaType>({
    mode: "all",
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      cardNumber: "",
      internetPassword: "",
      Mounth: "",
      year: "",
      cvv2: "",
    },
  });

  const dispatch = useDispatch();
  const { push } = useRouter();

  const onSubmit = (data: PaymentSchemaType) => {
    const error = false;
    if (error) {
      push("/shop/payment-failed");
      toast.error("پرداخت ناموفق بود!");
    } else {
      dispatch(clearCart());
      toast.success("پرداخت موفق بود!");
      push("/shop/paymentSuccess");
    } 
    console.log("Form Data:", data);
  };
  return (
    <div className="flex gap-x-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 py-6 px-5 bg-base text-right rounded-md shadow-lg"
      >
        <p className="text-2xl font-semibold text-textColor text-center">
          پرداخت
        </p>
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-4">
            <Controller
              name="cardNumber"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  error={errors.cardNumber?.message}
                  label="شماره کارت"
                  placeholder="شماره کارت"
                />
              )}
            />
            <Controller
              name="internetPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  error={errors.internetPassword?.message}
                  label="رمزاینترنتی"
                  placeholder="رمزاینترنتی"
                />
              )}
            />
            <div className="grid sm:grid-cols-3 items-center justify-center sm:gap-x-4">
              <Controller
                name="Mounth"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    error={errors.Mounth?.message}
                    label="ماه"
                    placeholder="ماه"
                  />
                )}
              />
              <Controller
                name="year"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    error={errors.year?.message}
                    label="سال"
                    placeholder="سال"
                  />
                )}
              />
              <Controller
                name="cvv2"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    error={errors.cvv2?.message}
                    label="cvv2"
                    placeholder="cvv2"
                  />
                )}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="py-2 px-1 w-full bg-textColor text-slate-600 text-sm rounded-md font-semibold hover:bg-slate-300"
        >
          پرداخت
        </button>
      </form>
      <div className="bg-base rounded-lg p-8">
        <div className="flex flex-col gap-y-4 text-textColor">
          <p className="text-nowrap">
            مبلغ قابل پرداخت : {total.toLocaleString("ar-EG")} تومان
          </p>
          <p>نام پذیرنده : کیف پول الکترونیک پارسیان</p>
          <p>کد پذیرنده : 1253 </p>
          <p>ادرس پذیرنده : Paypal.ir</p>
        </div>
        <p></p>
      </div>
    </div>
  );
};
