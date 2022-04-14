import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email().required(),
  cpf: yup.string().required(),
});

export default schema;
