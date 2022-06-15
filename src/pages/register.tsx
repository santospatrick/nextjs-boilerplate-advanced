import RegisterForm from "@/components/forms/RegisterForm";
import { FormValues } from "@/components/forms/RegisterForm/RegisterForm";
import api from "@/services/api";
import { Box, Container } from "@chakra-ui/react";
import axios from "axios";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

function Register() {
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      await api.post("/auth/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      // check if the error was thrown from axios
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
        <RegisterForm onSubmit={onSubmit} />
      </Box>
    </Container>
  );
}

export default Register;