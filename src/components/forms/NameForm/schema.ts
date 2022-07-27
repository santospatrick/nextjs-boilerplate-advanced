import { setupYup } from "@/config/yup";

const Yup = setupYup();

const schema = Yup.object({
  name: Yup.string().required(),
});

export default schema;
