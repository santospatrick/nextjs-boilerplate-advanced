import UpdatePasswordForm, {
  FormValues,
} from "@/components/forms/UpdatePasswordForm";
import { UpdatePasswordFormRefType } from "@/components/forms/UpdatePasswordForm/UpdatePasswordForm";
import api, { httpErrorHandler } from "@/services/api";
import { Box, Center, Container, Heading } from "@chakra-ui/react";
import Image from "next/image";
import { useRef } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import logo from "@/assets/logo.svg";

function UpdatePassword() {
  const ref = useRef<UpdatePasswordFormRefType>(null);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const token = await api.get(`/auth/get-token?${values.email}`);
    try {
      await api.post("/auth/update-password", {
        token: token,
        password: values.newPassword,
      });

      toast.success("Password updated successfully!");
    } catch (error: unknown) {
      httpErrorHandler(error, ref.current?.setError);
    }
  };

  return (
    <Container m="auto" maxW="container.sm">
      <Box py={10}>
        <Box mb={10} display="flex" justifyContent="center">
          <Image src={logo} alt="Logoipsum" />
        </Box>
        <Center>
          <Heading size="md">New password</Heading>
        </Center>
        <UpdatePasswordForm ref={ref} onSubmit={onSubmit} />
      </Box>
    </Container>
  );
}

export default UpdatePassword;
