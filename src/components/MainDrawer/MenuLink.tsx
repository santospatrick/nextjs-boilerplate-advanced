import React from "react";
import NextLink from "next/link";
import { As, Box, ListIcon } from "@chakra-ui/react";

type Props = {
  icon: As<any> | undefined;
  text: string;
  href: string;
};

function MenuLink({ icon, text, href }: Props) {
  return (
    <NextLink href={href} passHref>
      <Box
        display="flex"
        alignItems="center"
        height="48px"
        as="a"
        p={3}
        width="100%"
      >
        <ListIcon fontSize="24px" as={icon} color="gray.500" />
        <span>{text}</span>
      </Box>
    </NextLink>
  );
}

export default MenuLink;
