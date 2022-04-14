import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "@/components/forms/InputText";
import schema from "./schema";
import { Button } from "@chakra-ui/react";

export type FormValues = {
  email: string;
  cpf: string;
};

type Props = {
  onSubmit: SubmitHandler<FormValues>;
};

function ExampleForm({ onSubmit }: Props) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      cpf: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText type="email" label="Email" name="email" control={control} />
      <InputText
        mask="999.999.999-99"
        label="CPF"
        name="cpf"
        control={control}
      />
      <Button mt={2} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}

export default ExampleForm;
