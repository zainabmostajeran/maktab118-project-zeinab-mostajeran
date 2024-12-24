"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/apis/services/products";
import { ProductCard } from "@/components/shop/productcard";

interface Category {
  _id: string;
  name: string;
}

interface ProductListProps {
  category: Category;
  limit?: number;
  paginate?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  category,
  limit,
  paginate = false,
}) => {
  const {
    data: productsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const sortedProducts = useMemo(() => {
    if (!productsData?.data.products) return [];

    const filtered = productsData.data.products.filter(
      (product: IProducts) => product.category === category._id
    );

    const sorted = filtered.sort(
      (a: IProducts, b: IProducts) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return sorted;
  }, [productsData, category._id]);

  const isPaginationActive = paginate;

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = isPaginationActive ? limit ?? 8 : sortedProducts.length;

  const limitedItems = useMemo(() => {
    if (!isPaginationActive && typeof limit === "number") {
      return sortedProducts.slice(0, limit);
    }
    return sortedProducts;
  }, [isPaginationActive, limit, sortedProducts]);

  const totalItems = isPaginationActive
    ? sortedProducts.length
    : limitedItems.length;
  const totalPages = isPaginationActive
    ? Math.ceil(totalItems / (limit ?? 8))
    : 1;

  const currentItems = useMemo(() => {
    if (isPaginationActive) {
      const startIdx = (currentPage - 1) * (limit ?? 8);
      const endIdx = startIdx + (limit ?? 8);
      return sortedProducts.slice(startIdx, endIdx);
    } else {
      return limitedItems;
    }
  }, [isPaginationActive, currentPage, limit, sortedProducts, limitedItems]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [sortedProducts, itemsPerPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-4">
        <h3>در حال بارگذاری...</h3>
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">خطا در بارگذاری محصولات</div>;
  }

  if (sortedProducts.length === 0) {
    return <div className="text-gray-500">محصولی یافت نشد</div>;
  }

  return (
    <div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:items-center sm:justify-center sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 border py-6 px-4 mb-4 rounded-md bg-[rgb(188,184,138)] ">
        {currentItems.map((product: any) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
      {/* Pagination Controls */}
      {isPaginationActive && totalPages > 1 && (
        <div className="flex justify-center gap-x-2 items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            قبلی
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-blue-700 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {page}
              </button>
            )
          )}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            بعدی
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
