import { urls } from "../urls";
import { generateClient } from "../client";

type GetProductsType = (params: IReqGetProduct) => Promise<IProductsResponse>;
type AddProductType = (data: FormData) => Promise<{ message: string }>;
type DeleteProductsType = (id: string) => Promise<void>;
type EditProductsType = (id: string, data: FormData) => Promise<IProducts>;
type FetchProductByIdType = (id: string) => Promise<IProducts>;

export const getProducts: GetProductsType = async ({
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

export const AddProducts: AddProductType = async (data) => {
  const response = await generateClient().post(urls.products.add, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const DeleteProducts: DeleteProductsType = async (id) => {
  const response = await generateClient().delete(`${urls.products.byId(id)}`);
  return response.data;
};

export const EditProducts: EditProductsType = async (id, data) => {
  const response = await generateClient().patch(
    `${urls.products.byId(id)}`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
};

export const fetchProductById: FetchProductByIdType = async (id) => {
  const response = await generateClient().get(`${urls.products.byId(id)}`);
  return response.data;
};
