import axios from "axios";
import { UseFormSetError } from "react-hook-form";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

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

export default api;
