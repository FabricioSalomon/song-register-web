import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { message } from "antd";

import { Song } from "@/types";
import Api from "@/services/api";
import { QUERY_KEYS } from "@/utils/query-keys";

export type CreateSongDTO = {
  name: string;
  author_id: string;
  released_at: string;
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
