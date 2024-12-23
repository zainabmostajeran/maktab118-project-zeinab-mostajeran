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


export const LoginFormUser: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<authSchemaType>({
    mode: "all",
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const login = useLogin();
  const { push } = useRouter();

  const { isAuthenticated, error, loading } = useSelector(
    (state: RootState) => state.auth
  );

  React.useEffect(() => {
    if (isAuthenticated) {
      push("/");
    }
  }, [isAuthenticated, push]);

  React.useEffect(() => {
    if (error) {
      console.error(error);
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
      <p className="text-2xl font-semibold text-textColor text-center">ورود</p>
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
      <div className="flex items-center justify-between text-sm text-textColor ">
        <Link className="hover:underline" href="/auth/signup">عضویت</Link>
        <p className="hover:underline cursor-pointer">فراموشی رمز عبور</p>
      </div>
      <button
        type="submit"
        className="py-2 px-1 w-full bg-textColor text-slate-600 text-sm rounded-md font-semibold"
        disabled={loading}
      >
        {loading ? "در حال ورود..." : "ورود"}
      </button>
    </form>
  );
};
