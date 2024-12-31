import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/admin/Input";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { toast } from "react-toastify";
import { PaymentSchema, PaymentSchemaType } from "@/validation/payment";
export const PaymentForm: React.FC = () => {
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
  const onSubmit = (data: PaymentSchemaType) => {
    toast.success("اطلاعات با موفقیت ثبت شد!");
    console.log("Form Data:", data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 py-6 px-5 bg-base text-right rounded-md shadow-lg"
    >
      <p className="text-2xl font-semibold text-textColor text-center">
        پرداخت
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
          <div className="flex items-center justify-center gap-x-4">
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
  );
};
