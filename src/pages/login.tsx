import Image from "next/image";
import LoginForm, { FormValues } from "@/components/forms/LoginForm";
import api, { httpErrorHandler } from "@/services/api";
import { Box, Container } from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";
import logo from "@/assets/logo.svg";
import { useRef } from "react";
import { LoginFormRefType } from "@/components/forms/LoginForm/LoginForm";

function Login() {
  const ref = useRef<LoginFormRefType>(null);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      await api.post("/auth/login", {
        email: values.email,
        password: values.password,
      });
    } catch (error: unknown) {
      httpErrorHandler(error, ref.current?.setError);
    }
  };

  return (
    <Container m="auto" maxW="container.sm">
      <Box py={10}>
        <Box display="flex" justifyContent="center">
          <Image src={logo} alt="Logoipsum" />
        </Box>
        <LoginForm ref={ref} onSubmit={onSubmit} />
      </Box>
    </Container>
  );
}

export default Login;
