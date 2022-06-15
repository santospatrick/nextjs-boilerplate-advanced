import UpdatePasswordForm, {
  FormValues,
} from "@/components/forms/UpdatePasswordForm";
import api from "@/services/api";
import { Box, Container } from "@chakra-ui/react";
import axios from "axios";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

function UpdatePassword() {
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const token = await api.get(`/auth/get-token?${values.email}`);
    try {
      await api.post("/auth/update-password", {
        token: token,
        password: values.newPassword,
      });

      toast.success("Password updated successfully!");
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
        <UpdatePasswordForm onSubmit={onSubmit} />
      </Box>
    </Container>
  );
}

export default UpdatePassword;
