import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { forwardRef } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Control, useController } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  control: Control<any>;
  helperText?: string;
} & Partial<ReactDatePickerProps>;

function InputDate({ label, name, control, helperText, ...rest }: Props) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  const CustomInput = forwardRef(
    (props, ref: React.ForwardedRef<HTMLInputElement>) => {
      return (
        <FormControl isInvalid={invalid}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          {/* type="tel" to open number-only keyboard on mobile */}
          <Input
            isInvalid={invalid}
            id={name}
            type="tel"
            ref={ref}
            {...props}
          />
          {invalid ? (
            <FormErrorMessage>{error?.message}</FormErrorMessage>
          ) : (
            <FormHelperText>{helperText}</FormHelperText>
          )}
        </FormControl>
      );
    }
  );

  return (
    <DatePicker
      selected={value}
      ref={ref}
      strictParsing={true}
      customInput={<CustomInput />}
      onBlur={onBlur}
      onChange={(nextValue) => {
        if (nextValue) {
          onChange(nextValue);
        } else {
          onChange(undefined);
        }
      }}
      {...rest}
    />
  );
}

export default InputDate;
