import ForgetPasswordForm, {
  FormValues,
} from "@/components/forms/ForgetPasswordForm";
import { ForgetPasswordFormRefType } from "@/components/forms/ForgetPasswordForm/ForgetPasswordForm";
import api, { httpErrorHandler } from "@/services/api";
import { Box, Center, Container, Heading, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

function ForgetPassword() {
  const [sent, setSent] = useState(false);
  const ref = useRef<ForgetPasswordFormRefType>(null);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      await api.post("/auth/reset-password", {
        email: values.email,
      });
      setSent(true);
      toast.success("E-mail sent successfully.");
    } catch (error: unknown) {
      httpErrorHandler(error, ref.current?.setError);
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
        <ForgetPasswordForm ref={ref} onSubmit={onSubmit} />
      </Box>
    </Container>
  );
}

export default ForgetPassword;
