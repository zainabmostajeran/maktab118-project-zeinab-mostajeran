"use client";
import { classNames } from "@/utils/classname";

interface IInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  error?: string;
}

export const Input: React.FC<IInput> = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-y-2">
      {!!label && (
        <label className="text-textColor text-xs capitalize font-semibold">
          {label}
        </label>
      )}
      <input
        type="text"
        className={classNames(
          "border  rounded-md py-1 px-2 hover:outline focus:outline","text-right",
          "placeholder:text-xs placeholder:font-medium",
          !!error ? "border-red-500" : "border-slate-300",
          !!error ? "outline-red-500" : "outline-slate-200",
          !!error ? "placeholder:text-red-500" : "placeholder:text-slate-400",
          className
        )}
        {...props}
      />
      {!!error && (
        <p className="text-red-500 text-xs font-semibold capitalize">{error}</p>
      )}
    </div>
  );
};