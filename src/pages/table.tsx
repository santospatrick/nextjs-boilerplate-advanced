import HomeTable from "@/components/tables/HomeTable";
import { Container } from "@chakra-ui/react";
import React from "react";

function Table() {
  return (
    <Container m="auto" maxW="container.lg">
      <HomeTable />
    </Container>
  );
}

export default Table;
