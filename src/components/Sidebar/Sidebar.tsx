import { Box, Flex } from "@chakra-ui/react";
import SideMenu from "./SideMenu";
import { menu } from "./menu";
import Image from "next/image";

import Logo from "@/assets/logo.svg";

type Props = unknown;

const Sidebar = (_props: Props) => {
  return (
    <Box
      maxWidth={280}
      width="100%"
      backgroundColor="sageDark.sage3"
      paddingX="5"
      paddingY="12"
    >
      <Flex flexDirection="column" gap={90}>
        <Box width={120} height="64px" position="relative" marginX="auto">
          <Image layout="fill" objectFit="contain" src={Logo} alt="Logo" />
        </Box>

        <SideMenu items={menu} />
      </Flex>
    </Box>
  );
};

export default Sidebar;
