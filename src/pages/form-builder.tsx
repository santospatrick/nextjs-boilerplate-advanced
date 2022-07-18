import InputDate from "@/components/inputs/InputDate";
import InputText from "@/components/inputs/InputText";
import InputUpload from "@/components/inputs/InputUpload";
import schema from "@/examples/ExampleForm/schema";
import {
  Box,
  Checkbox,
  Container,
  Grid,
  GridItem,
  Image,
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

  const [fieldEmail, setFieldEmail] = useState(false);
  const [fieldCpf, setFieldCpf] = useState(false);
  const [fieldDate, setFieldDate] = useState(false);
  const [fieldUpload, setFieldUpload] = useState(false);

  return (
    <Container maxW="container.sm">
      <Box py={10}>
        <Image
          src="images/logo.svg"
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
