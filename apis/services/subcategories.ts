import { urls } from "../urls";
import { generateClient } from "../client";

type getSubCategoriesType = (_: IReqGetData) => Promise<ISubCategories>;

export const getSubCategories: getSubCategoriesType = async () => {
  const response = await generateClient().get(urls.subCategories.list);
  return response.data;
};

type getSubcategoryBySlugType = (slug: string) => Promise<ISubCategory>;

export const getSubCategoryBySlug: getSubcategoryBySlugType = async (slug) => {
  const response = await generateClient().get(
    `${urls.subCategories.list}?slugname=${slug}`
  );
  console.log(response.data.data.subcategories[0]);
  return response.data.data.subcategories[0];
};
