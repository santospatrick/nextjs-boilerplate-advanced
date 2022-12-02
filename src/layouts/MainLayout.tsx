import Sidebar from "@/components/Sidebar";
import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
};

function MainLayout({ children }: Props) {
  return (
    <Box display="flex" height="100vh">
      <Sidebar />
      <Box
        width="100%"
        overflowY="auto"
        paddingBottom={10}
        height="100%"
        display="flex"
      >
        {children}
      </Box>
    </Box>
  );
}

export default MainLayout;
