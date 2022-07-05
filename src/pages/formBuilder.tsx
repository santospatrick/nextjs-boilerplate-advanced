import InputDate from "@/components/forms/InputDate";
import InputText from "@/components/forms/InputText";
import InputUpload from "@/components/forms/InputUpload";
import schema from "@/examples/ExampleForm/schema";
import {
  Box,
  Checkbox,
  Container,
  Grid,
  GridItem,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

export type FormValues = {
  name: string;
  email: string;
  cpf: string;
  birthdate: Date | string | undefined;
  documents: File[];
};

const defaultValues = {
  name: "",
  email: "",
  cpf: "",
  birthdate: undefined,
  documents: [],
};

function Login() {
  const { control } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const [fieldName, setFieldName] = useState(false);
  const [formFieldName, setFormFieldName] = useState({});
  const [fieldEmail, setFieldEmail] = useState(false);
  const [fieldCpf, setFieldCpf] = useState(false);
  const [fieldDate, setFieldDate] = useState(false);
  const [fieldUpload, setFieldUpload] = useState(false);

  const addFormFieldName = async () => {
    setFormFieldName({
      formValues: [formFieldName, { name: "" }],
    });
  };

  const removeFormFields: i = async () => {
    formFieldName.splice(i, 1);
    this.setFormFieldName({ formFieldName });
  };

  return (
    <Container maxW="container.sm">
      <Box py={10}>
        <Image
          src="images/inovando.svg"
          alt="Inovando"
          margin={"0 auto"}
          boxSize="15rem"
        />
      </Box>
      <Grid
        templateAreas={`"nav main"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"150px 1fr"}
        h="200px"
        gap="1"
      >
        <GridItem pl="2" area={"nav"}>
          <Box>
            <NumberInput step={1} defaultValue={0} min={0} max={5}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper onClick={() => addFormFieldName()} />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box>
            <Checkbox value="email" onChange={() => setFieldEmail(!fieldEmail)}>
              E-mail
            </Checkbox>
          </Box>
          <Box>
            <Checkbox value="cpf" onChange={() => setFieldCpf(!fieldCpf)}>
              CPF
            </Checkbox>
          </Box>
          <Box>
            <Checkbox value="cpf" onChange={() => setFieldDate(!fieldDate)}>
              Date
            </Checkbox>
          </Box>
          <Box>
            <Checkbox value="cpf" onChange={() => setFieldUpload(!fieldUpload)}>
              Upload
            </Checkbox>
          </Box>
        </GridItem>
        <GridItem pl="2" area={"main"}>
          {fieldName && (
            <InputText label="Name" name="name" control={control} />
          )}
          {fieldEmail && (
            <InputText
              type="email"
              label="Email"
              name="email"
              control={control}
            />
          )}
          {fieldCpf && (
            <InputText
              mask="999.999.999-99"
              label="CPF"
              name="cpf"
              control={control}
            />
          )}
          {fieldDate && (
            <InputDate name="birthdate" label="Birthdate" control={control} />
          )}
          {fieldUpload && (
            <InputUpload name="documents" label="Documents" control={control} />
          )}
        </GridItem>
      </Grid>
    </Container>
  );
}

export default Login;
