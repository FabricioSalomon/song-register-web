import { message } from "antd";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Author } from "@/types";
import Api from "@/services/api";
import { QUERY_KEYS } from "@/utils/query-keys";

interface CreateAuthorDTO {
  name: string;
}

type CreateAuthorResponse = Author;

type Response = {
  message: string;
};

type CreateAuthorError = AxiosError<Response>;

async function createAuthor(parameters: CreateAuthorDTO): Promise<Author> {
  const { data } = await Api.post<Author>("/authors", parameters);
  return data;
}

export function useCreateAuthor() {
  const queryClient = useQueryClient();
  return useMutation<CreateAuthorResponse, CreateAuthorError, CreateAuthorDTO>({
    mutationFn: (payload) => createAuthor(payload),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AUTHORS.GET_AUTHORS_LIST],
      });
      message.success("Author created successfully");
    },
    onError: (error) => {
      message.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
}
