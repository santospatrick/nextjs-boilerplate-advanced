import LoginForm, { FormValues } from "@/components/forms/LoginForm";
import api from "@/services/api";
import { Box, Container, Image } from "@chakra-ui/react";
import axios from "axios";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

function Login() {
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      await api.post("/auth/login", {
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      } else {
        toast.error("Something wrong happened. Try again later.");
      }
    }
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
        <LoginForm onSubmit={onSubmit} />
      </Box>
    </Container>
  );
}

export default Login;
