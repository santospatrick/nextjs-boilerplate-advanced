import RegisterForm from "@/components/forms/RegisterForm";
import { FormValues } from "@/components/forms/RegisterForm/RegisterForm";
import api from "@/services/api";
import { Box, Container } from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";

function Register() {
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    await api.post("/auth/register", {
      username: values.username,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Container maxW="container.sm">
      <Box py={10}>
        <RegisterForm onSubmit={onSubmit} />
      </Box>
    </Container>
  );
}

export default Register;
