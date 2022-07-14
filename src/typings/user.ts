import { ApiPagination } from "./api";

export type UserData = {
  created_at: string;
  email: string;
  id: string;
  username: string;
};

export type UserResponse = {
  data: UserData[];
  pagination: ApiPagination;
};
