import { urls } from "../urls";
import axiosInstance from "../client";

type getSubCategoriesType = (_: IReqGetData) => Promise<ISubCategories>;

export const getSubCategories: getSubCategoriesType = async () => {
  const response = await axiosInstance.get(urls.subCategories.list);
  return response.data;
};

type getSubcategoryBySlugType = (slug: string) => Promise<ISubCategory>;

export const getSubCategoryBySlug: getSubcategoryBySlugType = async (slug) => {
  const response = await axiosInstance.get(
    `${urls.subCategories.list}?slugname=${slug}`
  );
  console.log(response.data.data.subcategories[0]);
  return response.data.data.subcategories[0];
};
