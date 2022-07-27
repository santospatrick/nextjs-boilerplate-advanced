import UpdatePasswordForm, {
  FormValues,
} from "@/components/forms/UpdatePasswordForm";
import { UpdatePasswordFormRefType } from "@/components/forms/UpdatePasswordForm/UpdatePasswordForm";
import api, { httpErrorHandler } from "@/services/api";
import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  Link as ChakraLink,
  Icon,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRef } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import logo from "@/assets/logo.svg";
import { useRouter } from "next/router";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

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
    <Container m="auto" maxW="400px">
      <Box py={10}>
        <Box mb={6} display="flex" justifyContent="center">
          <Link href="/login" passHref>
            <a>
              <Image src={logo} alt="Logoipsum" />
            </a>
          </Link>
        </Box>
        <Stack mb={10}>
          <Heading mb={2} textAlign="center" fontWeight={600} size="lg">
            Set new password
          </Heading>
          <Text align="center">
            Your new password must be different from the old one.
          </Text>
        </Stack>
        <UpdatePasswordForm ref={ref} onSubmit={onSubmit} />
        <Box display="flex" justifyContent="center" mt={8}>
          <Link href="/login" passHref>
            <ChakraLink>
              <Stack direction="row" align="center">
                <Icon as={MdArrowBack} />
                <span>Back to log in</span>
              </Stack>
            </ChakraLink>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default ResetPassword;
