import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";
import React, { forwardRef } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Control, useController } from "react-hook-form";
import InputMask, { Props as InputMaskProps } from "react-input-mask";

type Props = {
  label: string;
  name: string;
  control: Control<any>;
  helperText?: string;
  dateProps?: Partial<ReactDatePickerProps>;
} & InputProps &
  Partial<InputMaskProps>;

function InputDate({
  label,
  name,
  control,
  helperText,
  dateProps = {},
  mask = "99/99/9999",
  maskPlaceholder,
  alwaysShowMask,
  beforeMaskedStateChange,
  ...rest
}: Props) {
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
          <InputMask
            mask={mask}
            maskPlaceholder={maskPlaceholder}
            alwaysShowMask={alwaysShowMask}
            beforeMaskedStateChange={beforeMaskedStateChange}
            {...props}
          >
            {() => <Input ref={ref} isInvalid={invalid} type="tel" {...rest} />}
          </InputMask>
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
      dateFormat="dd/MM/yyyy"
      {...dateProps}
    />
  );
}

export default InputDate;
