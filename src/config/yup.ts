import * as Yup from "yup";
import { ptForm } from "yup-locale-pt";

export function setupYup() {
  Yup.setLocale(ptForm);

  return Yup;
}
