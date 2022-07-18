import PrivatePage from "@/layouts/PrivatePage";
import { Container } from "@chakra-ui/react";
import Link from "next/link";
import React, { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

const Index: NextPageWithLayout = () => {
  return (
    <Container maxWidth="1200px" m="auto" py={10}>
      <Link href="/forms">link</Link>
    </Container>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <PrivatePage title="Dashboard">{page}</PrivatePage>;
};

export default Index;
