import { urls } from "../urls";
import { generateClient } from "../client";

type getProductsType = (_: IReqGetProduct) => Promise<IProducts>;

export const getProducts: getProductsType = async ({
  page = "1",
  limit = "9",
}) => {
  const params = new URLSearchParams();

  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);

  const response = await generateClient().get(
    `${urls.products.list}?${params.toString()}`
  );
  return response.data;
};
// addproduct
type AddProductType = (_: { data: FormData }) => Promise<{ message: string }>;
export const AddProducts: AddProductType = async (data) => {
  const response = await generateClient().post(urls.products.add, data);
  return response.data;
};
// deleteproduct
type DeleteProductsType = (id: string) => Promise<void>;
export const DeleteProducts: DeleteProductsType = async (id) => {
  const response = await generateClient().delete(`urls.products.byId(${id})`);
  return response.data;
};
//Editproduct
type EditProductsType = (id: string) => Promise<IProducts>;
export const EditProducts: EditProductsType = async (id) => {
  const response = await generateClient().patch(`urls.products.byId(${id})`);
  return response.data;
};
//getproductbyid
type fetchProductByIdType = (id: string) => Promise<IProducts>;
export const fetchProductById: fetchProductByIdType = async (id) => {
  const response = await generateClient().get(`urls.products.byId(${id})`);
  return response.data;
};
