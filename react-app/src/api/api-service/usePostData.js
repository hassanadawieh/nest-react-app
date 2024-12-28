import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sendToApi } from "../api-methods";

export function usePostData({
  endpoint,
  showSuccessToast = true,
  callBackOnSuccess = () => {},
  queryKeysToInvalidate = [],
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => sendToApi(endpoint, data, "POST"),
    onSuccess: ({ data, message }) => {
      queryKeysToInvalidate.length > 0 &&
        queryKeysToInvalidate.forEach((key) =>
          queryClient.invalidateQueries({ queryKey: key })
        );

      showSuccessToast && message && toast.success(message);

      callBackOnSuccess && callBackOnSuccess(data);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
}
