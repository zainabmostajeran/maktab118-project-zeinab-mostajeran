"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface IImages {
  value: File[] | null;
  onChange: (files: File[] | null) => void;
  multiple?: boolean;
  error?: any;
  existingUrls?: string[];
}

export const Images: React.FC<IImages> = ({
  value,
  onChange,
  multiple = false,
  error,
  existingUrls = [],
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files ? Array.from(event.target.files) : null;
    onChange(files);
  };

  useEffect(() => {
    if (value && value.length > 0) {
      const objectUrls = value.map((file) => URL.createObjectURL(file));
      setPreviews(objectUrls);

      return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
    } else {
      setPreviews([]);
    }
  }, [value]);

  return (
    <div>
      <label className="text-textColor text-sm capitalize font-semibold">
        تصاویر محصول
      </label>
      <div
        onClick={handleClick}
        className={`relative border rounded-md flex flex-wrap items-center justify-center h-32 hover:bg-slate-50 cursor-pointer ${
          error ? "border-red-700" : "border-slate-300"
        }`}
      >
        {previews.length > 0 ? (
          previews.map((preview, index) => (
            <div key={index} className="relative w-16 h-16 m-1">
              <Image
                src={preview}
                fill={true}
                alt={`Selected Image ${index + 1}`}
                className="object-cover object-center rounded-md"
              />
            </div>
          ))
        ) : existingUrls.length > 0 ? (
          existingUrls.map((url, index) => (
            <div key={index} className="relative w-16 h-16 m-1">
              <Image
                src={url}
                fill={true}
                alt={`Existing Image ${index + 1}`}
                className="object-cover object-center rounded-md"
              />
            </div>
          ))
        ) : (
          <p
            className={`text-xs font-bold ${
              error ? "text-red-700" : "text-textColor"
            }`}
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
