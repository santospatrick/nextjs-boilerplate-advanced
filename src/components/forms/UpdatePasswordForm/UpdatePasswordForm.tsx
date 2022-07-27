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
  email: string;
  password: string;
  newPassword: string;
};

export type UpdatePasswordFormRefType = {
  setError: UseFormSetError<FormValues>;
};

type Props = {
  onSubmit: SubmitHandler<FormValues>;
};

const UpdatePasswordForm: ForwardRefRenderFunction<
  UpdatePasswordFormRefType,
  Props
> = ({ onSubmit }, ref) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setError,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      newPassword: "",
    },
  });

  useImperativeHandle(ref, () => ({
    setError,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2}>
        <InputText
          type="password"
          label="Password"
          name="password"
          control={control}
        />
        <InputText
          type="password"
          label="New password"
          name="newPassword"
          control={control}
        />
      </Stack>
      <Button
        mt={2}
        colorScheme="brand"
        isLoading={isSubmitting}
        type="submit"
        isFullWidth={true}
      >
        Reset password
      </Button>
    </form>
  );
};

export default forwardRef(UpdatePasswordForm);
