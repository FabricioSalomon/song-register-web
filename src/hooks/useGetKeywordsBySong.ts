import { useQuery } from "@tanstack/react-query";

import Api from "@/services/api";
import { Keyword } from "@/types";
import { QUERY_KEYS } from "@/utils";

export type GetKeywordBySongDTO = {
  song_id: string;
};

export type KeywordsBySongResponse = Keyword;

async function fetchKeywordsBySong<T, Body>(params: Body): Promise<T> {
  const url = "/keywords/list-by-song";
  const { data } = await Api.get<T>(url, {
    params,
  });
  return data;
}

export function useGetKeywordsBySong(params: GetKeywordBySongDTO) {
  const keywords = useQuery({
    queryKey: [QUERY_KEYS.KEYWORDS.GET_KEYWORDS_BY_SONG_LIST, params],
    queryFn: () =>
      fetchKeywordsBySong<KeywordsBySongResponse[], GetKeywordBySongDTO>(
        params
      ),
  });
  return {
    ...keywords,
    data: keywords.data ?? ([] as KeywordsBySongResponse[]),
  };
}
