import { urls } from "../urls";
import axiosInstance from "../client";

type getUserType = (params: IReqGetById) => Promise<IUser>;

export const getUser: getUserType = async ({ id }) => {
  const response = await axiosInstance.get(`${urls.Users.byId(id)}`);
  console.log(response);
  return response.data;
};
