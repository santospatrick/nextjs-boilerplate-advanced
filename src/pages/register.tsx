import RegisterForm from "@/components/forms/RegisterForm";
import { FormValues } from "@/components/forms/RegisterForm/RegisterForm";
import api from "@/services/api";
import { Box, Center, Container, Heading } from "@chakra-ui/react";
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
        profile_id: 2,
      });
      location.assign("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Something wrong happened. Try again later.");
      } else {
        toast.error("Something wrong happened. Try again later.");
      }
    }
  };

  return (
    <Container maxW="container.sm">
      <Box py={10}>
        <Center>
          <Heading size="md">New account</Heading>
        </Center>
        <RegisterForm onSubmit={onSubmit} />
      </Box>
    </Container>
  );
}

export default Register;
