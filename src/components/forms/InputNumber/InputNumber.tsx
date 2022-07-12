import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Control, useController } from "react-hook-form";
import NumberFormat, { NumberFormatProps } from "react-number-format";

type Props = {
  label: string;
  name: string;
  control: Control<any>;
  helperText?: string;
  brazilianCurrency?: boolean;
} & NumberFormatProps;

function InputNumber({
  label,
  name,
  control,
  helperText,
  brazilianCurrency,
  ...rest
}: Props) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
  } = useController({ name, control });

  const separators = useMemo(() => {
    return brazilianCurrency
      ? {
          thousandSeparator: ".",
          decimalSeparator: ",",
          decimalScale: 2,
          fixedDecimalScale: true,
          prefix: "R$",
        }
      : {};
  }, [brazilianCurrency]);

  return (
    <FormControl isInvalid={invalid}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <NumberFormat
        customInput={Input}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        // type="tel" to open number-only keyboard on mobile
        type="tel"
        {...separators}
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

export default InputNumber;
