"use client";

import { classNames } from "@/utils/classname";
import Image from "next/image";
import React from "react";

interface IThumbnail {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: any;
}

export const Thumbnail: React.FC<IThumbnail> = ({ value, onChange, error }) => {
  const [url, setUrl] = React.useState<string | undefined>(undefined);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (value) {
      const objectUrl = URL.createObjectURL(value);
      setUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setUrl(undefined);
    }
  }, [value]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <div>
      <label className="text-textColor text-sm capitalize font-semibold">
        عکس شاخص
      </label>
      <div
        onClick={handleClick}
        className={classNames(
          "relative border rounded-md flex",
          "items-center justify-center h-16 hover:bg-slate-50 cursor-pointer",
          error ? "border-red-700" : "border-slate-300"
        )}
      >
        {url ? (
          <Image
            src={url}
            fill={true}
            alt="Thumbnail Preview"
            className="object-cover object-center rounded-md"
          />
        ) : (
          <p
            className={classNames(
              "text-xs font-bold",
              error ? "text-red-700" : "text-textColor"
            )}
          >
            انتخاب عکس محصول
          </p>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          ref={inputRef}
          className="hidden"
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
