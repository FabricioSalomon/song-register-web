import { useInfiniteQuery } from "@tanstack/react-query";

import { Song } from "@/types";
import Api from "@/services/api";
import { QUERY_KEYS } from "@/utils";

export type ListAllSongsDTO = {
  limit: number;
  offset?: number;
};

export type ListAllSongsResponse = {
  count: number;
  rows: Song[];
  next_offset?: number;
};

async function listAllSongs<T, Body>(params: Body): Promise<T> {
  const url = "/songs/list";
  const { data } = await Api.get<T>(url, {
    params,
  });
  return data;
}

export function useListAllSongs({ limit }: ListAllSongsDTO) {
  const summary = useInfiniteQuery({
    queryKey: [QUERY_KEYS.SONGS.GET_SONGS_LIST, limit],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) =>
      listAllSongs<ListAllSongsResponse, ListAllSongsDTO>({
        offset: pageParam,
        limit,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.next_offset;
    },
    retry: 0,
  });

  return summary;
}
