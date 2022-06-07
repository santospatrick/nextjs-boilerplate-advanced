import { setupYup } from "@/config/yup";
import { validateBr } from "js-brasil";

const Yup = setupYup();

const schema = Yup.object({
  email: Yup.string().email().required(),
  cpf: Yup.string()
    .required()
    .test("cpf", "CPF inválido", function (value) {
      if (!value) return;
      return validateBr.cpf(value);
    }),
  birthdate: Yup.date().required(),
});

export default schema;
