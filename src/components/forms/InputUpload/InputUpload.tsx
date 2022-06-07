import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  List,
  ListIcon,
  ListItem,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useDropzone } from "react-dropzone";
import { Control, useController } from "react-hook-form";
import Numeral from "react-numeral";
import { MdCheckCircle } from "react-icons/md";
import { Container } from "./styles";

type Props = {
  label: string;
  name: string;
  control: Control<any>;
  helperText?: string;
};

function InputUpload({ label, name, control, helperText }: Props) {
  const {
    field: { onChange, value, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        onChange(acceptedFiles);
      },
    });

  const files = value.map((file: File) => (
    <ListItem key={file.name}>
      <ListIcon as={MdCheckCircle} color="green.500" />
      {file.name} - <Numeral value={file.size} format={"0.0 b"} />
    </ListItem>
  ));

  return (
    <FormControl isInvalid={invalid}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Stack spacing={4}>
        <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
          <input ref={ref} {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </Container>
        {!!files.length && <List spacing={3}>{files}</List>}
      </Stack>
      {invalid ? (
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

export default InputUpload;
