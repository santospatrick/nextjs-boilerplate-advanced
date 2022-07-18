import { AuthContext } from "@/contexts/AuthContext";
import PrivatePage from "@/layouts/PrivatePage";
import { Container, Text } from "@chakra-ui/react";
import React, { ReactElement, useContext } from "react";
import type { NextPageWithLayout } from "./_app";

const Index: NextPageWithLayout = () => {
  const { user } = useContext(AuthContext);
  return (
    <Container maxWidth="1400px" m="auto" py={10}>
      <Text align="center">Dashboard!</Text>
      <Text align="center">
        Logged in as: {user?.username} ({user?.email})
      </Text>
    </Container>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <PrivatePage title="Dashboard">{page}</PrivatePage>;
};

export default Index;
