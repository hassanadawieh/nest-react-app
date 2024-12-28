import { API } from "../../../lib/api";
import { usePostData } from "../../api-service/usePostData";


export const useAddProduct = () => {
  return usePostData({
    endpoint: API.addProduct,
    showSuccessToast: true,
    queryKeysToInvalidate: [["products"]],
    callBackOnSuccess: (data) => {
    },
  });

  
}
