//@ts-check

import { API } from "../../../lib/api";
import { useReadData } from "../../api-service/useReadData"


const useListProducts = (params = {}) => {
  return useReadData({
    queryKey: ["products", params],
    endpoint: API.listProducts ,
    keepPreviousData: true,
     refetchOnWindowFocus: false,
    params,
  });
};


export { useListProducts};
