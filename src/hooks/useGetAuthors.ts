import { useQuery } from "@tanstack/react-query";

import Api from "@/services/api";
import { Author } from "@/types";
import { QUERY_KEYS } from "@/utils";

export type GetAuthorsDTO = {
  name?: string;
};

export type AuthorsResponse = Author & {
  songs_registered: number;
};

async function fetchAuthors<T, Body>(params: Body): Promise<T> {
  const url = "/authors/list";
  const { data } = await Api.get<T>(url, {
    params,
  });
  return data;
}

export function useGetAuthors(params: GetAuthorsDTO | null = null) {
  const authors = useQuery({
    queryKey: [QUERY_KEYS.AUTHORS.GET_AUTHORS_LIST, params?.name],
    queryFn: () =>
      fetchAuthors<AuthorsResponse[], GetAuthorsDTO>({
        name: params?.name,
      }),
  });
  return {
    ...authors,
    data: authors.data ?? ([] as AuthorsResponse[]),
  };
}
