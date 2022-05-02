import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "@/components/forms/InputText";
import schema from "./schema";
import { Button, Stack } from "@chakra-ui/react";
import InputDate from "@/components/forms/InputDate";
import InputUpload from "@/components/forms/InputUpload";

export type FormValues = {
  email: string;
  cpf: string;
  initialDate: Date | string;
  documents: File[];
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
      initialDate: undefined,
      documents: [],
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2}>
        <InputText type="email" label="Email" name="email" control={control} />
        <InputText
          mask="999.999.999-99"
          label="CPF"
          name="cpf"
          control={control}
        />
        <InputDate name="initialDate" label="Initial Date" control={control} />
        <InputUpload name="documents" label="Documents" control={control} />
      </Stack>
      <Button mt={2} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}

export default ExampleForm;
