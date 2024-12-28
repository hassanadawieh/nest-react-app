//@ts-check

import { useQuery, keepPreviousData} from "@tanstack/react-query";
import { getFromApi } from "../api-methods";

export function useReadData({
  queryKey,
  endpoint,
  refetchOnWindowFocus = true,
  refetchOnMount = true,
  staleTime = 0,
  enabled = true,
  keepPreviousData: shouldKeepPreviousData = false,
  retry = 3,
  params = {},

}) {
 
    return useQuery({
    
    queryKey,
    queryFn: () => getFromApi(endpoint, params),
    refetchOnWindowFocus,
    refetchOnMount,
    staleTime,
    enabled,
    retry,
    placeholderData: shouldKeepPreviousData ? keepPreviousData : undefined,
  });
}
