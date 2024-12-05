import { urls } from "../urls";
import { generateClient } from "../client";

type getUserType = (params: IReqGetById) => Promise<IUser>;

export const getUser: getUserType = async ({ id }) => {
  const response = await generateClient().get(`${urls.Users.byId(id)}`);
  console.log(response);
  return response.data;
};
