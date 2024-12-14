import { urls } from "../urls";
import axiosInstance from "../client";

type getOrdersType = (_: IReqGetData) => Promise<IOrders>;

export const getOrders: getOrdersType = async ({
  page = "1",
  limit = "10",
}) => {
  const params = new URLSearchParams();
  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);
  const response = await axiosInstance.get(
    `${urls.orders.list}?${params.toString()}`
  );
  return response.data;
};
