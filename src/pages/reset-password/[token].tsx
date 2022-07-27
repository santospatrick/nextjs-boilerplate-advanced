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
import { useRouter } from "next/router";
import Link from "next/link";

function ResetPassword() {
  const ref = useRef<UpdatePasswordFormRefType>(null);
  const { query, push } = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      await api.post("update-password", {
        token: query.token,
        password: values.newPassword,
      });

      toast.success("Password updated successfully!");
      push("/login");
    } catch (error: unknown) {
      httpErrorHandler(error, ref.current?.setError);
    }
  };

  return (
    <Container m="auto" maxW="container.sm">
      <Box py={10}>
        <Box mb={10} display="flex" justifyContent="center">
          <Link href="/login" passHref>
            <a>
              <Image src={logo} alt="Logoipsum" />
            </a>
          </Link>
        </Box>
        <Center>
          <Heading size="md">New password</Heading>
        </Center>
        <UpdatePasswordForm ref={ref} onSubmit={onSubmit} />
      </Box>
    </Container>
  );
}

export default ResetPassword;
