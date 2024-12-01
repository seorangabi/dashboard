import { DateTime } from ".";

export type Project = {
  id: string;
  name: string;
  fee: number; // default value for Offering
  note: string | null; // default value for Offering
  deadline: DateTime; // default value for Offering
  imageRatio: string; // default value for Offering
  done: boolean;
  createdAt: DateTime;
};
