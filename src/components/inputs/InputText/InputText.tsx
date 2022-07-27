import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { Control, useController } from "react-hook-form";
import InputMask, { Props as InputMaskProps } from "react-input-mask";
import { ChangeEvent } from "react";
import PasswordContainer from "./PasswordContainer";

type Props = {
  label?: string;
  name: string;
  control: Control<any>;
  helperText?: string;
  mask?: string;
} & InputProps &
  Partial<InputMaskProps>;

function InputText({
  label,
  name,
  control,
  helperText,
  mask,
  maskPlaceholder,
  alwaysShowMask,
  beforeMaskedStateChange,
  type,
  ...rest
}: Props) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl isInvalid={invalid}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <PasswordContainer type={type}>
        {mask ? (
          <InputMask
            mask={mask}
            value={value}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onChange(event.target.value.replace(/[^\d]/g, ""));
            }}
            onBlur={onBlur}
            maskPlaceholder={maskPlaceholder}
            alwaysShowMask={alwaysShowMask}
            beforeMaskedStateChange={beforeMaskedStateChange}
          >
            {/* type="tel" to open number-only keyboard on mobile */}
            {() => <Input ref={ref} isInvalid={invalid} type="tel" {...rest} />}
          </InputMask>
        ) : (
          <Input
            id={name}
            ref={ref}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            isInvalid={invalid}
            type={type}
            {...rest}
          />
        )}
      </PasswordContainer>

      {invalid ? (
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

export default InputText;
