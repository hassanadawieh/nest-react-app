//@ts-check

import {  keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getFromApi } from "../api-methods";

export function useReadDataInfinite({
  queryKey,
  endpoint,
  refetchOnWindowFocus = true,
  refetchOnMount = true,
  staleTime = 0,
  enabled = true,
  keepPreviousData: shouldKeepPreviousData = false,
  retry = 3,
  params = {},
  initialPageParam = {},
}) {
   return useInfiniteQuery({
      queryKey,
     queryFn: async ({ pageParam = {} }) => getFromApi(endpoint, { paginationType: "cursor", 
      ...params,
      nextCursor: pageParam ?? "" }),
      refetchOnWindowFocus,
      refetchOnMount,
      staleTime,
      enabled,
      retry,
      placeholderData: shouldKeepPreviousData ? keepPreviousData : undefined,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      initialPageParam 
    });

}
