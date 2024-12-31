"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { OrderDataSchema, OrderDataSchemaType } from "@/validation/Order";
import { Input } from "@/components/admin/Input";
import Link from "next/link";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const OrderDataForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderDataSchemaType>({
    mode: "all",
    resolver: zodResolver(OrderDataSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      province: "",
      phoneNumber: "",
      deliveryDate: null,
    },
  });
  const onSubmit = (data: OrderDataSchemaType) => {
    toast.success("اطلاعات با موفقیت ثبت شد!");
    console.log("Form Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 py-6 px-5 bg-base text-right rounded-md shadow-lg"
    >
      <p className="text-2xl font-semibold text-textColor text-center">
        اطلاعات تماس
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                error={errors.firstName?.message}
                label="نام"
                placeholder="نام"
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                error={errors.lastName?.message}
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
            name="city"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                error={errors.city?.message}
                label="شهر"
                placeholder="شهر"
              />
            )}
          />
          <Controller
            name="province"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                error={errors.province?.message}
                label="استان"
                placeholder="استان"
              />
            )}
          />
          <Controller
            name="deliveryDate"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-y-2">
                <label className="block text-textColor text-xs capitalize font-semibold">
                  زمان تحویل
                </label>
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="زمان تحویل"
                  className="border rounded-md w-full text-sm py-1"
                />
                {errors.deliveryDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.deliveryDate.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </div>
      <button
        type="submit"
        className="py-2 px-1 w-full bg-textColor text-slate-600 text-sm rounded-md font-semibold hover:bg-slate-300"
      >
        ثبت
      </button>
    </form>
  );
};
