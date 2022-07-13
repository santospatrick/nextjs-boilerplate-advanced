import { Box, Container } from "@chakra-ui/react";
import ExampleForm, { FormValues } from "@/examples/ExampleForm";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { parseMaskedNumber } from "@/utils/parse";
import omit from "lodash.omit";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function Index() {
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
        <ExampleForm onSubmit={onSubmit} />
      </Box>
    </Container>
  );
}

export default Index;
