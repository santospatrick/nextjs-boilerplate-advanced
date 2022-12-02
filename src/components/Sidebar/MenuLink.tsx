import React from "react";
import NextLink from "next/link";
import { As, Box, Button, ListIcon, Text } from "@chakra-ui/react";
import { MdArrowDropDown, MdArrowRight } from "react-icons/md";

type Props = {
  icon?: As<any> | undefined;
  text: string;
  href?: string;
  onClickDropdown?: () => void;
  isGroup?: boolean;
  isOpened?: boolean;
};

function MenuLink({
  icon,
  text,
  href,
  onClickDropdown,
  isOpened = false,
}: Props) {
  if (href) {
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
          {icon && <ListIcon fontSize="24px" as={icon} color="gray.500" />}
          <span>{text}</span>
        </Box>
      </NextLink>
    );
  }

  return (
    <Button
      onClick={(event) => {
        event.stopPropagation();
        if (onClickDropdown) {
          onClickDropdown();
        }
      }}
      p={0}
      variant="ghost"
      borderRadius={0}
    >
      <Box display="flex" alignItems="center" height="48px" p={3} width="100%">
        <ListIcon fontSize="24px" as={icon} color="gray.500" />
        <Text fontWeight="normal">{text}</Text>
        <ListIcon
          ml="auto"
          fontSize="24px"
          as={isOpened ? MdArrowDropDown : MdArrowRight}
          color="gray.500"
        />
      </Box>
    </Button>
  );
}

export default MenuLink;
