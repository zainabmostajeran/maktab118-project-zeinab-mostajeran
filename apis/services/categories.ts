import { urls } from "../urls";
import { generateClient } from "../client";

type getCategoriesType = (_: IReqGetData) => Promise<ICategories>;

export const getCategories: getCategoriesType = async () => {
  const response = await generateClient().get(urls.categories.list);
  return response.data;
};
