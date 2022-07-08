import RegisterForm from "@/components/forms/RegisterForm";
import {
  FormValues,
  RegisterFormRefType,
} from "@/components/forms/RegisterForm/RegisterForm";
import api, { httpErrorHandler } from "@/services/api";
import { Box, Center, Container, Heading } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import logo from "@/assets/logo.svg";

function Register() {
  const router = useRouter();
  const ref = useRef<RegisterFormRefType>(null);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      await api.post("/auth/register", {
        username: values.username,
        email: values.email,
        password: values.password,
        profile_id: 2,
      });
      toast.success("Account created succesfully!");
      router.push("/login");
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
          <Heading size="md">Sign up</Heading>
        </Center>
        <RegisterForm ref={ref} onSubmit={onSubmit} />
      </Box>
    </Container>
  );
}

export default Register;
