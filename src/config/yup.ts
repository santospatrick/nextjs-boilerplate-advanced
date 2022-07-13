import * as Yup from "yup";
// import { ptForm } from "yup-locale-pt";
import { validateBr } from "js-brasil";

export function setupYup() {
  // Yup.setLocale(ptForm);

  Yup.addMethod(Yup.string, "cpf", function (errorMessage) {
    return this.test("invalid-cpf", errorMessage, function (value) {
      const { path, createError } = this;

      return (
        validateBr.cpf(value) || createError({ path, message: errorMessage })
      );
    });
  });

  return Yup;
}
