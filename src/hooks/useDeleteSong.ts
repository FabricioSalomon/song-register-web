import { message } from "antd";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Api from "@/services/api";
import { Song } from "@/types";
import { QUERY_KEYS } from "@/utils/query-keys";

interface DeleteSongDTO {
  id: string;
}

type DeleteSongResponse = Song;

type Response = {
  message: string;
};

type DeleteSongError = AxiosError<Response>;

async function deleteSong(params: DeleteSongDTO): Promise<Song> {
  const { data } = await Api.delete<Song>("/songs", {
    params,
  });
  return data;
}

export function useDeleteSong() {
  const queryClient = useQueryClient();
  return useMutation<DeleteSongResponse, DeleteSongError, DeleteSongDTO>({
    mutationFn: (payload) => deleteSong(payload),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SONGS.GET_SONGS_LIST],
      });
      message.success("Song deleted successfully");
    },
    onError: (error) => {
      message.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
}
