import RegisterForm from "@/components/forms/RegisterForm";
import {
  FormValues,
  RegisterFormRefType,
} from "@/components/forms/RegisterForm/RegisterForm";
import api, { httpErrorHandler } from "@/services/api";
import { Box, Center, Container, Heading } from "@chakra-ui/react";
import { useRef } from "react";
import { SubmitHandler } from "react-hook-form";

function Register() {
  const ref = useRef<RegisterFormRefType>(null);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      await api.post("/auth/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });
    } catch (error: unknown) {
      httpErrorHandler(error, ref.current?.setError);
    }
  };

  return (
    <Container maxW="container.sm">
      <Box py={10}>
        <Center>
          <Heading size="md">New account</Heading>
        </Center>
        <RegisterForm ref={ref} onSubmit={onSubmit} />
      </Box>
    </Container>
  );
}

export default Register;
