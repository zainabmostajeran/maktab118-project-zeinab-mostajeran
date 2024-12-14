import { urls } from "../urls";
import axiosInstance from "../client";

type getCategoriesType = (_: IReqGetData) => Promise<ICategories>;

export const getCategories: getCategoriesType = async () => {
  const response = await axiosInstance.get(urls.categories.list);
  return response.data;
};

type getCategoryBySlugType = (slug: string) => Promise<ICategory>;

export const getCategoryBySlug: getCategoryBySlugType = async (slug) => {
  const response = await axiosInstance.get(
    `${urls.categories.list}?slugname=${slug}`
  );
  return response.data.data.categories[0];
};
