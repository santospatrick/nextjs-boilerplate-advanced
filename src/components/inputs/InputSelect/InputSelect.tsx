import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import React from "react";
import { Control, useController } from "react-hook-form";
import { Props as ReactSelectProps } from "react-select";
import { Select } from "chakra-react-select";
import { chakraStyles } from "./styles";

type Props = {
  label: string;
  name: string;
  control: Control<any>;
  helperText?: string;
  options: any[];
} & ReactSelectProps;

type SelectedOption = {
  label: string;
  value: string | number;
};

function InputAutocomplete({
  label,
  name,
  control,
  helperText,
  options = [],
  ...rest
}: Props) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
  } = useController({ name, control });

  const handleChange = (selectedOption: SelectedOption) => {
    onChange(selectedOption.value);
  };

  const computedValue = (options || []).find(
    (option) => option.value === value
  );

  return (
    <FormControl isInvalid={invalid}>
      <FormLabel htmlFor="email">{label}</FormLabel>
      <Select
        name={name}
        value={computedValue}
        onChange={handleChange}
        onBlur={onBlur}
        options={options}
        placeholder=""
        ref={ref}
        instanceId={name}
        chakraStyles={chakraStyles}
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

export default InputAutocomplete;
