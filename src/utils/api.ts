import { create } from "apisauce";

const baseUrl =
  "https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events";

const api = create({
  baseURL: baseUrl,
});

export const GetAllEvents = async () => {
  const result = await api.get(`/`);
  return result;
};

export const GetSingleEvent = async (id: any) => {
  const result = await api.get(`/${id}`);
  return result;
};
