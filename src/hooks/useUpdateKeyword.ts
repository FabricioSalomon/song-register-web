import { message } from "antd";
import { AxiosError } from "axios";
import { QUERY_KEYS } from "@/utils/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Api from "@/services/api";
import { Keyword } from "@/types";

interface UpdateKeywordDTO {
  id: string;
  name: string;
}

type UpdateKeywordResponse = Keyword;

type Response = {
  message: string;
};

type UpdateKeywordError = AxiosError<Response>;

async function updateKeyword(parameters: UpdateKeywordDTO): Promise<Keyword> {
  const { data } = await Api.put<Keyword>("/keywords", parameters);
  return data;
}

export function useUpdateKeyword() {
  const queryClient = useQueryClient();
  return useMutation<
    UpdateKeywordResponse,
    UpdateKeywordError,
    UpdateKeywordDTO
  >({
    mutationFn: (payload) => updateKeyword(payload),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.KEYWORDS.GET_KEYWORDS_LIST],
      });
      message.success("Keyword updated successfully");
    },
    onError: (error) => {
      message.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
}
