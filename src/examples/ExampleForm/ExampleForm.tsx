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
import InputAutocomplete from "@/components/forms/InputAutocomplete";
import InputNumber from "@/components/forms/InputNumber";
import InputPhone from "@/components/forms/InputPhone";

export type FormValues = {
  name: string;
  email: string;
  cpf: string;
  birthdate: Date | string | undefined;
  documents: File[];
  phone: string;
};

type Props = {
  onSubmit: SubmitHandler<FormValues>;
  initialData?: Partial<FormValues> | undefined;
};

const defaultValues = {
  name: "",
  email: "",
  cpf: "",
  birthdate: undefined,
  documents: [],
  profile_id: null,
  user: null,
  real: 0,
  dolar: 0,
  creditCard: "",
  phone: "",
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

  const loadOptions = (_inputValue: string, callback: any) => {
    // Example:
    // api
    //   .get("user", {
    //     params: {
    //       username: inputValue,
    //     },
    //   })
    //   .then(({ data }) => {
    //     callback(data.data);
    //   });

    sleep(500).then(() => {
      callback([
        { id: 1, username: "Test" },
        { id: 2, username: "Another" },
      ]);
    });
  };

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
            { value: 1, label: "User" },
            { value: 2, label: "Editor" },
            { value: 3, label: "Admin" },
          ]}
          control={control}
        />
        <InputAutocomplete
          loadOptions={loadOptions}
          name="user"
          label="User"
          control={control}
          labelAttribute="username"
        />
        <InputNumber
          name="real"
          label="Real"
          brazilianCurrency
          control={control}
        />
        <InputNumber
          name="dollar"
          label="Dollar"
          prefix="$"
          thousandSeparator=","
          decimalScale={2}
          fixedDecimalScale
          control={control}
        />
        <InputNumber
          name="creditCard"
          label="Credit Card"
          format="#### #### #### ####"
          control={control}
        />
        <InputPhone
          name="phone"
          label="Phone"
          control={control}
          defaultCountry="US"
        />
      </Stack>
      <Button
        mt={2}
        colorScheme="twitter"
        isLoading={isSubmitting}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}

export default ExampleForm;
