"use client";

import { classNames } from "@/utils/classname";
import Image from "next/image";
import React from "react";

interface IImages {
  value: File[] | null;
  onChange: (files: File[] | null) => void;
  multiple?: boolean;
  error?: any;
}

export const Images: React.FC<IImages> = ({
  value,
  onChange,
  multiple = false,
  error,
}) => {
  const [urls, setUrls] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (value && value.length > 0) {
      const objectUrls = value.map((file) => URL.createObjectURL(file));
      setUrls(objectUrls);

      // Clean up the object URLs when the component unmounts or files change
      return () => {
        objectUrls.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setUrls([]);
    }
  }, [value]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files ? Array.from(event.target.files) : null;
    onChange(files);
  };

  return (
    <div>
      <label className="text-textColor text-sm capitalize font-semibold">
        تصاویر محصول
      </label>
      <div
        onClick={handleClick}
        className={classNames(
          "relative border rounded-md flex flex-wrap",
          "items-center justify-center h-32 hover:bg-slate-50 cursor-pointer",
          error ? "border-red-700" : "border-slate-300"
        )}
      >
        {urls.length > 0 ? (
          urls.map((url, index) => (
            <div key={index} className="relative w-16 h-16 m-1">
              <Image
                src={url}
                fill={true}
                alt={`Image Preview ${index + 1}`}
                className="object-cover object-center rounded-md"
              />
            </div>
          ))
        ) : (
          <p
            className={classNames(
              "text-xs font-bold",
              error ? "text-red-700" : "text-textColor"
            )}
          >
            انتخاب تصاویر محصول
          </p>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          ref={inputRef}
          className="hidden"
          multiple={multiple}
        />
      </div>
      {error && (
        <p className="text-red-500 text-xs capitalize font-semibold">
          {error.message}
        </p>
      )}
    </div>
  );
};
