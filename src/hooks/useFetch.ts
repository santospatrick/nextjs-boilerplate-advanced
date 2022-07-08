import { useQuery, UseQueryOptions } from "react-query";
import api from "@/services/api";

// Usage:
// import { useFetch } from "@/hooks/useFetch";
//
// type Post = {
//   id: number;
//   author: string;
//   title: string;
// };
//
// const { isLoading, data, error } = useFetch<Post>("posts");

export function useFetch<Type>(
  url: string,
  key?: string,
  options?: UseQueryOptions<Type, any, Type>
) {
  const useQueryReturn = useQuery<Type, Error>(
    key || url,
    () => api.get(url).then((response) => response.data),
    options
  );

  return useQueryReturn;
}
