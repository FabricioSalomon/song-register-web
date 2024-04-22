import { AxiosError } from "axios";
import { QUERY_KEYS } from "@/utils/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Api from "@/services/api";
import { Keyword } from "@/types";
import { message } from "antd";

interface DeleteKeywordDTO {
  id: string;
}

type DeleteKeywordResponse = Keyword;

type Response = {
  message: string;
};

type DeleteKeywordError = AxiosError<Response>;

async function deleteKeyword(params: DeleteKeywordDTO): Promise<Keyword> {
  const { data } = await Api.delete<Keyword>("/keywords", {
    params,
  });
  return data;
}

export function useDeleteKeyword() {
  const queryClient = useQueryClient();
  return useMutation<
    DeleteKeywordResponse,
    DeleteKeywordError,
    DeleteKeywordDTO
  >({
    mutationFn: (payload) => deleteKeyword(payload),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AUTHORS.GET_AUTHORS_LIST],
      });
      message.success("Keyword deleted successfully");

    },
    onError: (error) => {
      message.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
}
