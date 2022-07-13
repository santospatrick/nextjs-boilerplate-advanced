/* eslint-disable @typescript-eslint/no-unused-vars */
import { StringSchema } from "yup";

declare module "yup" {
  interface StringSchema {
    cpf(message?: string): StringSchema;
  }
}
