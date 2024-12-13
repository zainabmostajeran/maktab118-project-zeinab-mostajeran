"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";


interface SubcategoryCardProps {
  subcategoryId: string;
  subcategoryName: string;
  subcategorySlugname: string;
  categorySlugname: string;
}

const SubcategoryCard: React.FC<SubcategoryCardProps> = ({
  subcategoryId,
  subcategoryName,
  subcategorySlugname,
  categorySlugname,

}) => {
  return (
    <Link
      className="rounded-md block bg-base text-textColor shadow-lg hover:bg-textColor hover:text-base "
      href={`/shop/category/${categorySlugname}/${subcategorySlugname}`}
    >
      <div className="p-10 border flex items-center justify-center">
        <h3 className="text-xl font-semibold mb-4">{subcategoryName}</h3>
      </div>
    </Link>
  );
};

export default SubcategoryCard;
