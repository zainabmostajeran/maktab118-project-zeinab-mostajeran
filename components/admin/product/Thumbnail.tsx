"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface IThumbnail {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: any;
  existingUrl?: string | null;
}

export const Thumbnail: React.FC<IThumbnail> = ({
  value,
  onChange,
  error,
  existingUrl,
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0] || null;
    onChange(file);
  };

  useEffect(() => {
    if (value) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [value]);

  return (
    <div>
      <label className="text-textColor text-sm capitalize font-semibold">
        عکس شاخص
      </label>
      <div
        onClick={handleClick}
        className={`relative border rounded-md flex items-center  justify-center h-32 hover:bg-slate-50 cursor-pointer ${
          error ? "border-red-700" : "border-slate-300"
        }`}
      >
        {preview ? (
          <Image
            src={preview}
            fill={true}
            alt="Thumbnail Preview"
            className="object-contain object-center rounded-md"
            
          />
        ) : existingUrl ? (
          <Image
            src={existingUrl}
            fill={true}
            alt="Existing Thumbnail"
            className="object-contain object-center rounded-md "
          />
        ) : (
          <p
            className={`text-xs font-bold ${
              error ? "text-red-700" : "text-textColor"
            }`}
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
        <p className="text-red-500 text-xs capitalize font-semibold pt-1">
          {error.message}
        </p>
      )}
    </div>
  );
};
