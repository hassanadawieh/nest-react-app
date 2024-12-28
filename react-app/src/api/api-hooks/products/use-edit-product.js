import { API } from "../../../lib/api";
import { useUpdateData } from "../../api-service/useUpdateData";


export const useEditProduct = ({ id , callBackOnSuccess }) => {
  return useUpdateData({
    endpoint: API.updateProduct(id),
    showSuccessToast: true,
    queryKeysToInvalidate: [["products"]],
    callBackOnSuccess: (data) => {
      callBackOnSuccess && callBackOnSuccess(data);
    },
  });

  
}
