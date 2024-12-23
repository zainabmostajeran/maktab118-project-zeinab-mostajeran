"use client";
import React from "react";
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
      email: "",
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
      address: data.email,
    };

    signup.mutate(payload, {
      onSuccess: (data) => {
        toast.success("ثبت نام موفقیت آمیز بود.");
        push("/auth/login");
      },
      onError: (error: any) => {
        console.error("Signup failed:", error);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 py-8 px-5 bg-base text-right rounded-md"
    >
      <p className="text-2xl font-semibold text-textColor text-center">عضویت</p>
      <div className="flex items-center justify-between gap-x-5">
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
              label="نام خانوداگی"
              placeholder="نام خانوداگی"
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
      <div className="flex items-center justify-center gap-x-5">
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
            <Input
              {...field}
              type="password"
              error={errors.password?.message}
              label="پسورد"
              placeholder="پسورد"
            />
          )}
        />
      </div>
      <div className="flex items-center justify-center gap-x-5">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              error={errors.email?.message}
              label=" ایمیل"
              placeholder=" ایمیل"
            />
          )}
        />
        <Controller
          name="repeatPassword"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              error={errors.repeatPassword?.message}
              label="تکرار رمز عبور"
              placeholder="تکرار رمز عبور"
            />
          )}
        />
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
