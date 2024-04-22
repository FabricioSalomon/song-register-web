import { useQuery } from "@tanstack/react-query";
import { Moment } from "moment";

import { Author, Keyword, Song } from "@/types";
import Api from "@/services/api";
import { QUERY_KEYS } from "@/utils";

export type ListAllSongsDTO = {
  name?: string;
  keyword?: string;
  author_id?: string;
  released_at_end?: Moment;
  released_at_start?: Moment;
};

export type ListAllSongsResponse = Song & {
  author: Pick<Author, "name">;
  keywords: Pick<Keyword, "name">[];
};

async function listAllSongs<T, Body>(params: Body): Promise<T> {
  const url = "/songs/list";
  const { data } = await Api.get<T>(url, {
    params,
  });
  return data;
}

export function useListAllSongs(params: ListAllSongsDTO) {
  const summary = useQuery({
    queryKey: [QUERY_KEYS.SONGS.GET_SONGS_LIST, params],
    queryFn: async () =>
      listAllSongs<ListAllSongsResponse[], ListAllSongsDTO>(params),

    retry: 0,
  });

  return summary;
}
