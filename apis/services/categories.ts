import { urls } from "../urls";
import { generateClient } from "../client";

type getCategoriesType = (_: IReqGetData) => Promise<ICategories>;

export const getCategories: getCategoriesType = async () => {
  const response = await generateClient().get(urls.categories.list);
  return response.data;
};

type getCategoryBySlugType = (slug: string) => Promise<ICategory>;

export const getCategoryBySlug: getCategoryBySlugType = async (slug) => {
  const response = await generateClient().get(
    `${urls.categories.list}?slugname=${slug}`
  );
  return response.data.data.categories[0];
};
