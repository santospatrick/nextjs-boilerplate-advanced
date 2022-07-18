import { setupYup } from "@/config/yup";

const Yup = setupYup();

const schema = (id: string | undefined) =>
  Yup.object(
    id
      ? {
          email: Yup.string().required(),
          username: Yup.string().required(),
          password: Yup.string(),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Passwords must match"
          ),
        }
      : {
          email: Yup.string().required(),
          username: Yup.string().required(),
          password: Yup.string().required(),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required(),
        }
  );

export default schema;
