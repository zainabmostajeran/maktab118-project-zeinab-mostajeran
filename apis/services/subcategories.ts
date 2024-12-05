import { urls } from "../urls";
import { generateClient } from "../client";

type getSubCategoriesType = (_: IReqGetData) => Promise<ISubCategories>;

export const getSubCategories: getSubCategoriesType = async () => {
  const response = await generateClient().get(urls.subCategories.list);
  return response.data;
};
