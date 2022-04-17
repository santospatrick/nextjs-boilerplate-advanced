import { Container } from "@chakra-ui/react";
import ExampleForm, { FormValues } from "@/examples/ExampleForm";
import { SubmitHandler } from "react-hook-form";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function Index() {
  const onSubmit: SubmitHandler<FormValues> = async () => {
    await sleep(1000);
  };

  return (
    <Container maxW="container.xl">
      <ExampleForm onSubmit={onSubmit} />
    </Container>
  );
}

export default Index;
