import { urls } from "../urls";
import { generateClient } from "../client";

type getProductsType = (_: IReqGetProduct) => Promise<IProducts>;

export const getProducts: getProductsType = async ({
  page = "1",
  limit = "10",
}) => {
  const params = new URLSearchParams();

  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);

  const response = await generateClient().get(
    `${urls.products.list}?${params.toString()}`
  );

  return response.data;
};