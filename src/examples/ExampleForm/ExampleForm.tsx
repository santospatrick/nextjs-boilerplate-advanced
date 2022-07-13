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
import InputTextarea from "@/components/forms/InputTextarea";
import numeral from "numeral";
import api from "@/services/api";
import { UserResponse } from "@/typings/user";

type User = {
  id: number;
  username: string;
};

export type FormValues = {
  name: string;
  email: string;
  birthdate: Date | string | undefined;
  documents: Pick<File, "name" | "size" | "type">[];
  profile_id: number | null;
  user: User | null;
  real: number;
  dollar: number;
  creditCard: string;
  phone: string;
  description: string;
};

type Props = {
  onSubmit: SubmitHandler<FormValues>;
  initialData?: Partial<FormValues> | undefined;
  users: UserResponse;
};

const defaultValues = {
  name: "",
  email: "",
  birthdate: undefined,
  documents: [],
  profile_id: null,
  user: null,
  real: 0,
  dollar: 0,
  creditCard: "",
  phone: "",
  description: "",
};

function ExampleForm({ onSubmit, initialData, users }: Props) {
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

  const loadOptions = (inputValue: string, callback: any) => {
    api
      .get("user", {
        params: {
          username: inputValue,
        },
      })
      .then(({ data }) => {
        callback(data.data);
      });
  };

  const onClickFulfill = () => {
    reset({
      ...defaultValues,
      name: "Patrick, Spongebob's BF",
      email: "valid@email.com",
      birthdate: new Date(),
      documents: [
        {
          name: "file.jpeg",
          type: "image/jpeg",
          size: numeral("5 MB").value() as number,
        },
      ],
      profile_id: 1,
      user: {
        id: 1,
        username: "santospatrick",
      },
      dollar: 0.01,
      creditCard: "4929519268662573",
      phone: "+12025550118",
      description:
        "Some description\nWhich can contain line breaks\nAlso can only be resized vertically to prevent layout overflow",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Button onClick={onClickFulfill} mb={4} colorScheme="blue">
        Fulfill with values :)
      </Button>
      <Stack spacing={2}>
        <InputText label="Name" name="name" control={control} />
        <InputText type="email" label="Email" name="email" control={control} />
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
          defaultOptions={users.data}
          control={control}
          labelAttribute="username"
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
        <InputTextarea
          name="description"
          label="Description"
          control={control}
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
