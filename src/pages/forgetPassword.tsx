import ForgetPasswordForm, {
  FormValues,
} from "@/components/forms/ForgetPasswordForm";
import api from "@/services/api";
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

function ForgetPassword() {
  const [sent, setSent] = useState(false);
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      await api.post("/auth/reset-password", {
        email: values.email,
      });
      setSent(true);
      toast.success("E-mail sent successfully.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Something wrong happened. Try again later.");
      } else {
        toast.error("Something wrong happened. Try again later.");
      }
    }
  };

  if (sent) {
    return (
      <Container maxW="container.sm">
        <Box py={10}>
          <Text>Verify your e-mail and follow the instructions.</Text>
        </Box>
      </Container>
    );
  }
  return (
    <Container maxW="container.sm">
      <Box py={10}>
        <Center>
          <Heading size="md">Forget my password</Heading>
        </Center>
        <ForgetPasswordForm onSubmit={onSubmit} />
      </Box>
    </Container>
  );
}

export default ForgetPassword;
