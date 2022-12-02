import CrudForm from "@/components/forms/CrudForm";
import MainLayout from "@/layouts/MainLayout";
import {
  Box,
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

const Index: NextPageWithLayout = () => {
  function handleSubmit(data: any) {
    return data;
  }

  return (
    <Container maxWidth="1045px" height="100%" m="auto" py={10}>
      <Tabs
        display="flex"
        justifyContent="center"
        flexDirection="column"
        variant="soft-rounded"
      >
        <TabList
          margin="0 auto"
          backgroundColor="sageDark.sage3"
          px="12px"
          py="8px"
          borderRadius={100}
        >
          <Tab
            color="sageDark.sage12"
            _selected={{ backgroundColor: "sageDark.sage5" }}
          >
            Generate
          </Tab>
          <Tab
            color="sageDark.sage12"
            _selected={{ backgroundColor: "sageDark.sage5" }}
          >
            Generated
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box width="100%" backgroundColor="sageDark.sage3">
              <Box
                as="header"
                paddingX={29}
                paddingY={5}
                borderBottom="2px solid"
                borderColor="sageDark.sage6"
              >
                <Text as="h2" variant="heading" color="white">
                  Crud Generator
                </Text>
              </Box>

              <Flex flexDirection="column" marginBottom={10}>
                <CrudForm onSubmit={handleSubmit} />
              </Flex>
            </Box>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Dashboard">{page}</MainLayout>;
};

export default Index;
