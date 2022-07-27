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
};

export type ForgetPasswordFormRefType = {
  setError: UseFormSetError<FormValues>;
};

type Props = {
  onSubmit: SubmitHandler<FormValues>;
};

const ForgetPasswordForm: ForwardRefRenderFunction<
  ForgetPasswordFormRefType,
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
    },
  });

  useImperativeHandle(ref, () => ({
    setError,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2}>
        <InputText type="email" label="Email" name="email" control={control} />
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

export default forwardRef(ForgetPasswordForm);
