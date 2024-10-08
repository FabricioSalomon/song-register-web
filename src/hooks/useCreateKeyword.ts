import { message } from "antd";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Api from "@/services/api";
import { Keyword } from "@/types";
import { QUERY_KEYS } from "@/utils/query-keys";

interface CreateKeywordDTO {
  name: string;
}

type CreateKeywordResponse = Keyword;

type Response = {
  message: string;
};

type CreateKeywordError = AxiosError<Response>;

async function createKeyword(parameters: CreateKeywordDTO): Promise<Keyword> {
  const { data } = await Api.post<Keyword>("/keywords", parameters);
  return data;
}

export function useCreateKeyword() {
  const queryClient = useQueryClient();
  return useMutation<
    CreateKeywordResponse,
    CreateKeywordError,
    CreateKeywordDTO
  >({
    mutationFn: (payload) => createKeyword(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.KEYWORDS.GET_KEYWORDS_LIST],
      });
      message.success("Keyword created successfully");
    },
    onError: (error) => {
      message.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
}
