import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Control, useController } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  control: Control<any>;
  helperText?: string;
};

function InputText({ label, name, control, helperText }: Props) {
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
      <Input
        id={name}
        ref={ref}
        type="email"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={invalid}
      />
      {invalid ? (
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

export default InputText;
