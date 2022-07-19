import { ComponentMeta } from "@storybook/react";
import ExampleForm, { FormValues } from "@/examples/ExampleForm";
import { UserResponse } from "@/typings/user";
import { SubmitHandler } from "react-hook-form";
import { Box } from "@chakra-ui/react";
import api, { httpErrorHandler } from "@/services/api";
import { useRef } from "react";
import { ExampleFormRef } from "@/examples/ExampleForm/ExampleForm";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

export const FormWorkingCorrectly = () => {
  const formRef = useRef<ExampleFormRef>(null);

  const { data } = useQuery<UserResponse>("users", () =>
    api.get("/user").then((response) => response.data)
  );

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    // eslint-disable-next-line
    console.log('values', values)
  };

  return (
    <Box maxWidth="400px" m="auto">
      <ExampleForm ref={formRef} onSubmit={onSubmit} users={data} />
    </Box>
  );
};

export const FormWithError = () => {
  const formRef = useRef<ExampleFormRef>(null);

  const { data } = useQuery<UserResponse>("users", () =>
    api.get("/user").then((response) => response.data)
  );

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    // eslint-disable-next-line
    console.log('values', values)

    try {
      // this is calling the wrong endpoint intentionally :)
      await api.post("/auth/register", {
        username: "lorem",
        email: "admin@admin.com",
        password: "lorem",
        profile_id: 2,
      });
    } catch (error) {
      httpErrorHandler(error, formRef.current?.setError);
    }
  };

  return (
    <Box maxWidth="400px" m="auto">
      <ExampleForm ref={formRef} onSubmit={onSubmit} users={data} />
    </Box>
  );
};

const queryClient = new QueryClient();

const config = {
  title: "Example Form",
  component: ExampleForm,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} as ComponentMeta<typeof ExampleForm>;

export default config;
