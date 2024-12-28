//@ts-check
import { axiosPrivate } from "../lib/PrivateAxios";

export const getFromApi = async (endpoint, params = {}) => {
  try {
    const result = await axiosPrivate.get(endpoint, {
      params,
    });
    return result.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export const sendToApi = async (endpoint, data, method) => {
  try {
    let result;
    if (method === "POST") result = await axiosPrivate.post(endpoint, data);
    else if (method === "PUT") result = await axiosPrivate.put(endpoint, data);
    else if (method === "DELETE") result = await axiosPrivate.delete(endpoint);
    return result?.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Cannot send request");
  }
};
