import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Control, useController } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInputWithCountry, { Country } from "react-phone-number-input";

type Props = {
  label: string;
  name: string;
  control: Control<any>;
  helperText?: string;
  defaultCountry?: Country;
};

function InputPhone({ label, name, control, helperText, ...rest }: Props) {
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

      <PhoneInputWithCountry
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        inputComponent={Input}
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

export default InputPhone;
