import { setupYup } from "@/config/yup";

const Yup = setupYup();

const schema = Yup.object({
  create: Yup.boolean(),
  update: Yup.boolean(),
  delete: Yup.boolean(),
  read: Yup.boolean(),
  name: Yup.string().required(),
  useAllByName: Yup.boolean(),
  tableName: Yup.string().required(),
  controller: Yup.string().required(),
  transform: Yup.string().required(),
  transformer: Yup.string().required(),
  route: Yup.string().required(),
  modelName: Yup.string().required(),
  fields: Yup.array().of(
    Yup.object({
      name: Yup.string().required(),
      type: Yup.string().required(),
      required: Yup.boolean(),
      nullable: Yup.boolean(),
      unique: Yup.boolean(),
      default: Yup.string(),
    })
  ),
});

export default schema;
