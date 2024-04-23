import { Author } from "./Author";

export type Song = {
  id: string;
  name: string;
  released_at: Date;
  author_id: Pick<Author, "id">;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};
