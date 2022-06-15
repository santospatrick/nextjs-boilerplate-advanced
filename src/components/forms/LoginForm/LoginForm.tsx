import InputText from "@/components/forms/InputText";
import { Button, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import schema from "./schema";

export type FormValues = {
  email: string;
  password: string;
};

type Props = {
  onSubmit: SubmitHandler<FormValues>;
};

function LoginForm({ onSubmit }: Props) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2}>
        <InputText type="email" label="Email" name="email" control={control} />
        <InputText
          type="password"
          label="Password"
          name="password"
          control={control}
        />
      </Stack>
      <Stack align={"center"}>
        <Button
          mt={2}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
}

export default LoginForm;
