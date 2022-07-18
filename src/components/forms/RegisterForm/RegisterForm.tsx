import InputText from "@/components/inputs/InputText";
import { Button, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from "react";
import { SubmitHandler, useForm, UseFormSetError } from "react-hook-form";
import schema from "./schema";

export type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  onSubmit: SubmitHandler<FormValues>;
};

export type RegisterFormRefType = {
  setError: UseFormSetError<FormValues>;
};

const RegisterForm: ForwardRefRenderFunction<RegisterFormRefType, Props> = (
  { onSubmit },
  ref
) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setError,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useImperativeHandle(ref, () => ({
    setError,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2}>
        <InputText
          type="text"
          label="Username"
          name="username"
          control={control}
        />
        <InputText type="email" label="Email" name="email" control={control} />
        <InputText
          type="password"
          label="Password"
          name="password"
          control={control}
        />
        <InputText
          type="password"
          label="Confirm password"
          name="confirmPassword"
          control={control}
        />
      </Stack>
      <Button
        mt={2}
        colorScheme="twitter"
        isLoading={isSubmitting}
        type="submit"
        isFullWidth={true}
      >
        Submit
      </Button>
    </form>
  );
};

export default forwardRef(RegisterForm);
