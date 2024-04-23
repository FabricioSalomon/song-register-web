import { useQuery } from "@tanstack/react-query";

import Api from "@/services/api";
import { Keyword } from "@/types";
import { QUERY_KEYS } from "@/utils";

export type GetKeywordsDTO = {
  name?: string;
};

export type KeywordsResponse = Keyword;

async function fetchKeywords<T, Body>(params: Body): Promise<T> {
  const url = "/keywords/list";
  const { data } = await Api.get<T>(url, {
    params,
  });
  return data;
}

export function useGetKeywords(params: GetKeywordsDTO | null = null) {
  const keywords = useQuery({
    queryKey: [QUERY_KEYS.KEYWORDS.GET_KEYWORDS_LIST, params?.name],
    queryFn: () =>
      fetchKeywords<KeywordsResponse[], GetKeywordsDTO>({
        name: params?.name,
      }),
  });
  return {
    ...keywords,
    data: keywords.data ?? ([] as KeywordsResponse[]),
  };
}
