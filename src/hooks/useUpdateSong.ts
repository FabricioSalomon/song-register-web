import { message } from "antd";
import { Moment } from "moment";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Song } from "@/types";
import Api from "@/services/api";
import { QUERY_KEYS } from "@/utils/query-keys";

export type UpdateSongDTO = {
  id: string;
  name?: string;
  author_id?: string;
  released_at?: string;
  keywords_ids?: string[];
};

type UpdateSongResponse = Song;

type Response = {
  message: string;
};

type UpdateSongError = AxiosError<Response>;

async function updateSong(parameters: UpdateSongDTO): Promise<Song> {
  const { data } = await Api.put<Song>("/songs", parameters);
  return data;
}

export function useUpdateSong() {
  const queryClient = useQueryClient();
  return useMutation<UpdateSongResponse, UpdateSongError, UpdateSongDTO>({
    mutationFn: (payload) => updateSong(payload),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SONGS.GET_SONGS_LIST],
      });
      message.success("Song updated successfully");
    },
    onError: (error) => {
      message.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
}
