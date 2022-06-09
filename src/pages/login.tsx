import LoginForm, { FormValues } from "@/components/forms/LoginForm";
import api from "@/services/api";
import { Box, Container } from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";

function Login() {
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    await api.post("/auth/login", {
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Container maxW="container.sm">
      <Box py={10}>
        <LoginForm onSubmit={onSubmit} />
      </Box>
    </Container>
  );
}

export default Login;
