import { Dayjs } from "dayjs";

export type FormFields = {
  name?: string;
  keyword?: string;
  author_id?: string;
  released_at?: Dayjs[];
};

export type FilterRequest = {
  name?: string;
  keyword?: string;
  author_id?: string;
  released_at_end?: string;
  released_at_start?: string;
};
