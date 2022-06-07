import { setupYup } from "@/config/yup";

const Yup = setupYup();

const schema = Yup.object({
  email: Yup.string().email().required(),
});

export default schema;
