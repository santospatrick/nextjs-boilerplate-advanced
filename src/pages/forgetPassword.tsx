import ForgetPasswordForm, {
  FormValues,
} from "@/components/forms/ForgetPasswordForm";
import { Box, Container } from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function ForgetPassword() {
  const onSubmit: SubmitHandler<FormValues> = async (_values) => {
    await sleep(1000);
    toast.success(
      "Nice submission! take a look at the values on your browser console."
    );
  };

  return (
    <Container maxW="container.sm">
      <Box py={10}>
        <ForgetPasswordForm onSubmit={onSubmit} />
      </Box>
    </Container>
  );
}

export default ForgetPassword;
