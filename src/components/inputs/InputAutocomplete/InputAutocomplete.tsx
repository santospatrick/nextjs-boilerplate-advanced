import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import React from "react";
import { Control, useController } from "react-hook-form";
import { Props as ReactSelectProps } from "react-select";
import { AsyncSelect } from "chakra-react-select";
import debounce from "lodash.debounce";
import get from "lodash.get";
import { chakraStyles } from "../InputSelect/styles";

type Props = {
  label: string;
  name: string;
  control: Control<any>;
  helperText?: string;
  loadOptions: (inputValue: string, callback: any) => void;
  labelAttribute: string;
  valueAttribute?: string;
  defaultOptions?: any[];
} & ReactSelectProps;

function InputAutocomplete({
  label,
  name,
  control,
  helperText,
  loadOptions,
  labelAttribute,
  valueAttribute = "id",
  defaultOptions,
  ...rest
}: Props) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  const loadOptionsDebounced = debounce(loadOptions, 250);

  return (
    <FormControl isInvalid={invalid}>
      <FormLabel htmlFor="email">{label}</FormLabel>
      <AsyncSelect
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder=""
        ref={ref}
        loadOptions={loadOptionsDebounced}
        getOptionValue={(option) => get(option, valueAttribute)}
        getOptionLabel={(option) => get(option, labelAttribute)}
        defaultOptions={defaultOptions}
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
