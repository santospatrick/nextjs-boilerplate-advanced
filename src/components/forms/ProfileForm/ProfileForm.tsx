import InputText from "@/components/inputs/InputText";
import { UserData } from "@/typings/user";
import { Box, Button } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from "react";
import {
  SubmitHandler,
  useForm,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
import schema from "./schema";

export type FormValues = UserData & {
  password: string;
  confirmPassword: string;
};

type Props = {
  onSubmit: SubmitHandler<FormValues>;
  defaultValues: Partial<FormValues>;
};

export type ProfileFormRefType = {
  setError: UseFormSetError<FormValues>;
  setValue: UseFormSetValue<FormValues>;
};

const ProfileForm: ForwardRefRenderFunction<ProfileFormRefType, Props> = (
  { onSubmit, defaultValues },
  ref
) => {
  const { handleSubmit, control, setError, setValue } = useForm({
    defaultValues: {
      id: "",
      created_at: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      ...defaultValues,
    },
    resolver: yupResolver(schema),
  });

  useImperativeHandle(ref, () => ({
    setError,
    setValue,
  }));

  return (
    <Box
      as="form"
      maxWidth="600px"
      m="auto"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <InputText label="Username" name="username" control={control} />
      <InputText label="Email" type="email" name="email" control={control} />
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
      <Button mt={8} type="submit" colorScheme="brand">
        Submit
      </Button>
    </Box>
  );
};

export default forwardRef(ProfileForm);
