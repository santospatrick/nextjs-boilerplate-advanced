import axios from "axios";
import { parseCookies } from "nookies";
import { UseFormSetError } from "react-hook-form";
import { toast } from "react-toastify";

export function getAPIClient(ctx?: any) {
  const { "nextjs-boilerplate-advanced.token": token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return api;
}

export const viacep = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});

type FieldErrorType = {
  field: string;
  message: string;
};

type ErrorResponse = {
  error: FieldErrorType[];
};

export const httpErrorHandler = (
  error: unknown,
  setError: UseFormSetError<any> | undefined
) => {
  if (axios.isAxiosError(error) && error.response) {
    const errorsList = (error.response?.data as ErrorResponse).error || [];
    errorsList.forEach((fieldError) => {
      const { field, message } = fieldError;
      if (setError) {
        setError(field, { type: "custom", message });
      }
    });
    toast.error("Form is invalid.");
  } else {
    toast.error("Something wrong happened. Try again later.");
  }
};

export default getAPIClient();
