import { Box, Container } from "@chakra-ui/react";
import ExampleForm, { FormValues } from "@/examples/ExampleForm";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { parseMaskedNumber } from "@/utils/parse";
import omit from "lodash.omit";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/api";
import { UserResponse } from "@/typings/user";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type Props = {
  users: UserResponse;
};

function Index({ users }: Props) {
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const parsed = {
      ...values,
      dollar: parseMaskedNumber(values.dollar),
      userId: values.user?.id,
    };
    const data = omit(parsed, ["user"]);
    // eslint-disable-next-line no-console
    console.log("🚀 ~ submit data:", data);
    await sleep(1000);
    toast.success("Check your browser console 🚀");
  };

  return (
    <Container maxW="container.sm">
      <Box py={10}>
        <ExampleForm onSubmit={onSubmit} users={users} />
      </Box>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { "nextjs-boilerplate-advanced.token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { data: users } = await apiClient.get("/user");

  return {
    props: {
      users,
    },
  };
};

export default Index;
