"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { signupSchema, signupSchemaType } from "@/validation/signup";
import { Input } from "@/components/admin/Input";
import { useSignup } from "@/apis/mutation/signup";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Link from "next/link";
import { toast } from "react-toastify";

export const UserSignupForm: React.FC = () => {
  const [showPassword,setShowPassword]=useState(false);
  const [showRepeatPassword,setShowRepeatPassword]=useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<signupSchemaType>({
    mode: "all",
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phoneNumber: "",
      username: "",
      password: "",
      address: "",
      repeatPassword: "",
    },
  });

  const signup = useSignup();
  const { push } = useRouter();

  const { error, loading } = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const onSubmit = (data: signupSchemaType) => {
    const payload = {
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      password: data.password,
      phoneNumber: data.phoneNumber,
      address: data.address,
    };

    signup.mutate(payload, {
      onSuccess: (data) => {
        toast.success("ثبت نام موفقیت آمیز بود.");
        push("/auth/login");
      },
      onError: (error: any) => {
        try {
          if (error.response && error.response.data) {
            const { data } = error.response;
    
            const serverErrorMessage =
              data.message ||
              data.error ||   
              "خطای نامشخص سمت سرور";
    
            const finalMessage = Array.isArray(serverErrorMessage)
              ? serverErrorMessage.join(" | ")
              : serverErrorMessage;
    
            toast.error(finalMessage);
          } else {
            toast.error("خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.");
          }
        } catch (err) {
          toast.error("یک خطای غیرمنتظره رخ داد.");
        }
      },
    });
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 py-3 px-5 bg-base text-right rounded-md"
    >
      <p className="text-2xl font-semibold text-textColor text-center">عضویت</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Controller
            name="firstname"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                error={errors.firstname?.message}
                label="نام"
                placeholder="نام"
              />
            )}
          />
          <Controller
            name="lastname"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                error={errors.lastname?.message}
                label="نام خانوادگی"
                placeholder="نام خانوادگی"
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="phone"
                error={errors.phoneNumber?.message}
                label="شماره تماس"
                placeholder="شماره تماس"
              />
            )}
          />
        </div>
        <div className="space-y-4">
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                error={errors.address?.message}
                label="آدرس"
                placeholder="آدرس"
              />
            )}
          />
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
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
              <div className="relative">
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  error={errors.password?.message}
                  label="رمز عبور"
                  placeholder="رمز عبور"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 top-2 left-3 flex  items-center text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            )}
          />
          <Controller
            name="repeatPassword"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <Input
                  {...field}
                  type={showRepeatPassword ? "text" : "password"}
                  error={errors.repeatPassword?.message}
                  label="تکرار رمز عبور"
                  placeholder="تکرار رمز عبور"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 top-2 left-3 flex items-center text-gray-500"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                >
                  {showRepeatPassword ? "🙈" : "👁"}
                </button>
              </div>
            )}
          />
        </div>
      </div>
      <button
        type="submit"
        className="py-2 px-1 w-full bg-textColor text-slate-600 text-sm rounded-md font-semibold hover:bg-white"
        disabled={loading}
      >
        {loading ? "در حال ورود..." : "عضویت"}
      </button>
      <div className="flex items-center justify-center hover:underline text-textColor">
        <Link href="/auth/login">ورود</Link>
      </div>
    </form>
  );
};
