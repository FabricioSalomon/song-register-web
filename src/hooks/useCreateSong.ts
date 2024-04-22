import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/query-keys";
import { AxiosError } from "axios";
import { Moment } from "moment";
import { message } from "antd";

import { Song } from "@/types";
import Api from "@/services/api";

export type CreateSongDTO = {
  name: string;
  author_id: string;
  released_at: Moment;
  keywords_ids: string[];
};

type CreateSongResponse = Song;

type Response = {
  message: string;
};

type CreateSongError = AxiosError<Response>;

async function createSong(parameters: CreateSongDTO): Promise<Song> {
  const { data } = await Api.post<Song>("/songs", parameters);
  return data;
}

export function useCreateSong() {
  const queryClient = useQueryClient();
  return useMutation<CreateSongResponse, CreateSongError, CreateSongDTO>({
    mutationFn: (payload) => createSong(payload),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SONGS.GET_SONGS_LIST],
      });
      message.success("Song created successfully");
    },
    onError: (error) => {
      message.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
}
