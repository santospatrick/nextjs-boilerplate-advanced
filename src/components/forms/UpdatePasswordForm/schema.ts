import { setupYup } from "@/config/yup";

const Yup = setupYup();

const schema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  newPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export default schema;
