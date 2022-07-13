import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import React from "react";
import { Control, useController } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  control: Control<any>;
  helperText?: string;
  mask?: string;
} & TextareaProps;

function InputTextarea({ label, name, control, helperText, ...rest }: Props) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl isInvalid={invalid}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Textarea
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        size="sm"
        resize="vertical"
        bgColor={"#fff"}
        {...rest}
      />
      {invalid ? (
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

export default InputTextarea;
