import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const viacep = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});

export default api;
