"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { authSchema, authSchemaType } from "@/validation/auth";
import { Input } from "@/components/admin/Input";
import { useLogin } from "@/apis/mutation/auth";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Link from "next/link";
import { toast } from "react-toastify";

export const LoginFormAdmin: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<authSchemaType>({
    mode: "all",
    resolver: zodResolver(authSchema) ,
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const login = useLogin();
  const { push } = useRouter();

  const { isAuthenticated, error, loading } = useSelector(
    (state: RootState) => state.auth
  );

  React.useEffect(() => {
    if (isAuthenticated) {
      push("/admin");
      toast.success("باموفقیت وارد شدید")
    }
  }, [isAuthenticated, push]);

  React.useEffect(() => {
    if (error) {
      toast.error("عدم موفقیت ");
    }
  }, [error]);

  const onSubmit = (data: authSchemaType) => {
    login.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-10 bg-base text-right rounded-md"
    >
      <p className="text-2xl pb-2 font-semibold text-textColor text-center">
        ورود به پنل مدیریت پیتزا نوشا
      </p>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            error={errors.username?.message}
            label="نام کاربری"
            placeholder="نام کاربری"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="password"
            error={errors.password?.message}
            label="پسورد"
            placeholder="پسورد"
          />
        )}
      />
      <button
        type="submit"
        className="py-2 px-1 w-full bg-textColor text-slate-600 text-sm rounded-md font-semibold hover:bg-slate-300"
        disabled={loading}
      >
        {loading ? "در حال ورود..." : "ورود"}
      </button>
      <div className="flex flex-col gap-y-2 items-center justify-center text-sm ">
        <Link className="hover:underline text-white" href="/">
          بازگشت به سایت
        </Link>
        <p className="text-textColor">
          اگر اکانت ندارید با مدیر درارتباط باشید
        </p>
      </div>
    </form>
  );
};
