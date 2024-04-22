import { AxiosError } from "axios";
import { QUERY_KEYS } from "@/utils/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Api from "@/services/api";
import { Author } from "@/types";
import { message } from "antd";

interface UpdateAuthorDTO {
  id: string;
  name: string;
}

type UpdateAuthorResponse = Author;

type Response = {
  message: string;
};

type UpdateAuthorError = AxiosError<Response>;

async function updateAuthor(parameters: UpdateAuthorDTO): Promise<Author> {
  const { data } = await Api.put<Author>("/authors", parameters);
  return data;
}

export function useUpdateAuthor() {
  const queryClient = useQueryClient();
  return useMutation<UpdateAuthorResponse, UpdateAuthorError, UpdateAuthorDTO>({
    mutationFn: (payload) => updateAuthor(payload),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AUTHORS.GET_AUTHORS_LIST],
      });
    },
    onError: (error) => {
      message.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
}
