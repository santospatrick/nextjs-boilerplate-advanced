import ForgetPasswordForm, {
  FormValues,
} from "@/components/forms/ForgetPasswordForm";
import api from "@/services/api";
import { Box, Container, Text } from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

function ForgetPassword() {
  const [sent, setSent] = useState(false);
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setSent(true);
    await api.post("/auth/reset-password", {
      email: values.email,
    });
    toast.success("E-mail sent successfully.");
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
        <ForgetPasswordForm onSubmit={onSubmit} />
      </Box>
    </Container>
  );
}

export default ForgetPassword;
