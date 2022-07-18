import UsersTable from "@/components/tables/UsersTable";
import PrivatePage from "@/layouts/PrivatePage";
import { Container } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";

const Users: NextPageWithLayout = () => {
  return (
    <Container maxWidth="1400px" m="auto" py={10}>
      <UsersTable />
    </Container>
  );
};

Users.getLayout = function getLayout(page: ReactElement) {
  return <PrivatePage title="Users">{page}</PrivatePage>;
};

export default Users;
