import UpdatePasswordForm, {
  FormValues,
} from "@/components/forms/UpdatePasswordForm";
import api from "@/services/api";
import { Box, Container } from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

function UpdatePassword() {
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const token = await api.get(`/auth/get-token?${values.email}`);
    await api.post("/auth/update-password", {
      token: token,
      password: values.newPassword,
    });
    toast.success("Password updated successfully.");
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
