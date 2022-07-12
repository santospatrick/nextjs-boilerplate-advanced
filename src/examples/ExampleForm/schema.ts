import { setupYup } from "@/config/yup";
import { parseMaskedNumber } from "@/utils/parse";
import { validateBr } from "js-brasil";

const Yup = setupYup();

const schema = Yup.object({
  // name: Yup.string().required(),
  // email: Yup.string().email().required(),
  // cpf: Yup.string()
  //   .required()
  //   .test("cpf", "CPF inválido", function (value) {
  //     if (!value) return;
  //     return validateBr.cpf(value);
  //   }),
  // birthdate: Yup.date().required(),
  // profile_id: Yup.number().required(),
  // real: Yup.number()
  //   .transform((value) =>
  //     isNaN(value) ? undefined : parseMaskedNumber(value, "BRL")
  //   )
  //   .min(0.01)
  //   .required(),
});

export default schema;
