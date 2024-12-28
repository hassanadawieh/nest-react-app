//@ts-check
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendToApi } from "../api-methods";

export function useDeleteData({
  queryKeysToInvalidate = [],
  endpoint,
  callBackOnSuccess,
  callBackOnError,
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await sendToApi(endpoint, {}, "DELETE");
    },
    onSuccess: () => {
      queryKeysToInvalidate &&
        queryKeysToInvalidate.forEach((key) =>
          queryClient.invalidateQueries({ queryKey: key })
        );

      callBackOnSuccess && callBackOnSuccess();
    },
    onError: (err) => {
      callBackOnError && callBackOnError(err.message);
    },
  });
}
