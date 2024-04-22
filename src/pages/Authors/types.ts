import type { Moment } from "moment";

export type FormFields = {
  name: string;
  created_at?: Moment[];
};

export type FilterRequest = {
  name: string;
  created_at_end?: string;
  created_at_start?: string;
};
