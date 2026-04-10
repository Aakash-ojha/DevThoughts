import { apiClient } from "./api";

export interface ITag {
  _id: string;
  slug: string;
  name: string;
  color: string;
}
const getTags = async (): Promise<ITag[]> => {
  const { data } = await apiClient.get("/tags");
  return data.data;
};

export { getTags };
