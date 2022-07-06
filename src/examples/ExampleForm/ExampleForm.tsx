import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "@/components/forms/InputText";
import schema from "./schema";
import { Button, Stack } from "@chakra-ui/react";
import InputDate from "@/components/forms/InputDate";
import InputUpload from "@/components/forms/InputUpload";
import { useEffect } from "react";
import { parseISO } from "date-fns";
import InputSelect from "@/components/forms/InputSelect";

export type FormValues = {
  name: string;
  email: string;
  cpf: string;
  birthdate: Date | string | undefined;
  documents: File[];
};

type Props = {
  onSubmit: SubmitHandler<FormValues>;
  initialData: Partial<FormValues> | undefined;
};

const defaultValues = {
  name: "",
  email: "",
  cpf: "",
  birthdate: undefined,
  documents: [],
};

function ExampleForm({ onSubmit, initialData }: Props) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    reset({
      ...defaultValues,
      ...initialData,
      birthdate: initialData?.birthdate
        ? parseISO(initialData?.birthdate as string)
        : undefined,
    });
  }, [reset, initialData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2}>
        <InputText label="Name" name="name" control={control} />
        <InputText type="email" label="Email" name="email" control={control} />
        <InputText
          mask="999.999.999-99"
          label="CPF"
          name="cpf"
          control={control}
        />
        <InputDate name="birthdate" label="Birthdate" control={control} />
        <InputUpload name="documents" label="Documents" control={control} />
        <InputSelect
          name="profile_id"
          label="Profile"
          options={[
            { value: 1, label: "Usuário" },
            { value: 2, label: "Editor" },
            { value: 3, label: "Administrador" },
          ]}
          control={control}
        />
      </Stack>
      <Button mt={2} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}

export default ExampleForm;
