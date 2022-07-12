import { Box, Container } from "@chakra-ui/react";
import ExampleForm, { FormValues } from "@/examples/ExampleForm";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function Index() {
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    // eslint-disable-next-line no-console
    console.log(
      "🚀 ~ file: index.tsx ~ line 10 ~ const onSubmit:SubmitHandler<FormValues>= ~ _values",
      values
    );
    await sleep(1000);
    toast.success("Check your browser console 🚀");
  };

  return (
    <Container maxW="container.sm">
      <Box py={10}>
        <ExampleForm onSubmit={onSubmit} />
      </Box>
    </Container>
  );
}

export default Index;
