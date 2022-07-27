import ForgetPasswordForm, {
  FormValues,
} from "@/components/forms/ForgetPasswordForm";
import { ForgetPasswordFormRefType } from "@/components/forms/ForgetPasswordForm/ForgetPasswordForm";
import api, { httpErrorHandler } from "@/services/api";
import { Box, Container, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import logo from "@/assets/logo.svg";
import Link from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const ref = useRef<ForgetPasswordFormRefType>(null);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      await api.post("reset-password", {
        email: values.email,
      });
      setEmail(values.email);
      toast.success("E-mail sent successfully.");
    } catch (error: unknown) {
      httpErrorHandler(error, ref.current?.setError);
    }
  };

  if (email) {
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
              Check your email
            </Heading>
            <Stack spacing={0}>
              <Text align="center">We have sent a password reset link to</Text>
              <Text fontWeight="bold" align="center">
                {email}
              </Text>
            </Stack>
          </Stack>
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
            Forgot password?
          </Heading>
          <Text align="center">
            Don't worry, instructions will be sent to your email.
          </Text>
        </Stack>
        <ForgetPasswordForm ref={ref} onSubmit={onSubmit} />
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

export default ForgetPassword;
