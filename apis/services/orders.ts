import { urls } from "../urls";
import { generateClient } from "../client";

type getOrdersType = (_: IOrders) => Promise<IOrders>;

export const getOrders: getOrdersType = async ({}) => {
  const response = await generateClient().get(urls.orders.list);
  return response.data;
};
