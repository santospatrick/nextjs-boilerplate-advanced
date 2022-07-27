import { ApiPagination } from "./api";

export type UserData = {
  createdAt: string;
  email: string;
  id: string;
  name: string;
  status: boolean;
};

export type UserResponse = {
  data: UserData[];
  pagination: ApiPagination;
};
