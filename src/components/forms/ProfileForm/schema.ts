import { setupYup } from "@/config/yup";

const Yup = setupYup();

const schema = Yup.object({
  email: Yup.string().required(),
  username: Yup.string().required(),
  password: Yup.string(),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export default schema;
