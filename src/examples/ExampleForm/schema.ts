import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email().required(),
});

export default schema;
