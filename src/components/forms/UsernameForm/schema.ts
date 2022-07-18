import { setupYup } from "@/config/yup";

const Yup = setupYup();

const schema = Yup.object({
  username: Yup.string().required(),
});

export default schema;
