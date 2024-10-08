import { message } from "antd";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Api from "@/services/api";
import { Author } from "@/types";
import { QUERY_KEYS } from "@/utils/query-keys";

interface DeleteAuthorDTO {
  id: string;
}

type DeleteAuthorResponse = Author;

type Response = {
  message: string;
};

type DeleteAuthorError = AxiosError<Response>;

async function deleteAuthor(params: DeleteAuthorDTO): Promise<Author> {
  const { data } = await Api.delete<Author>("/authors", {
    params,
  });
  return data;
}

export function useDeleteAuthor() {
  const queryClient = useQueryClient();
  return useMutation<DeleteAuthorResponse, DeleteAuthorError, DeleteAuthorDTO>({
    mutationFn: (payload) => deleteAuthor(payload),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AUTHORS.GET_AUTHORS_LIST],
      });
      message.success("Author deleted successfully");
    },
    onError: (error) => {
      message.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
}
