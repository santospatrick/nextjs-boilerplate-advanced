import { Box, Container } from "@chakra-ui/react";
import ExampleForm, { FormValues } from "@/examples/ExampleForm";
import { SubmitHandler } from "react-hook-form";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function Index() {
  const onSubmit: SubmitHandler<FormValues> = async (_values) => {
    await sleep(1000);
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
