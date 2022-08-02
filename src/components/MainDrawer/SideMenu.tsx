import React, { useState } from "react";
import { Box, Button, ListIcon, ListItem, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import * as Styled from "./styles";
import { MdArrowDropDown, MdArrowRight } from "react-icons/md";
import { useRouter } from "next/router";

type Props = {
  items: any[];
};

const SideMenu = ({ items }: Props) => {
  const [displayChildren, setDisplayChildren] = useState<
    Record<string, boolean>
  >({});
  const router = useRouter();

  return (
    <Styled.NestedList>
      {items.map((item) => (
        <ListItem display="flex" flexDirection="column" key={item.text}>
          {item.children ? (
            <Button
              onClick={() => {
                setDisplayChildren((prevState) => ({
                  ...prevState,
                  [item.text]: !displayChildren[item.text],
                }));
              }}
              p={0}
              variant="ghost"
              borderRadius={0}
            >
              <Box
                display="flex"
                alignItems="center"
                height="48px"
                p={3}
                width="100%"
              >
                <ListIcon fontSize="24px" as={item.icon} color="gray.500" />
                <Text fontWeight="normal">{item.text}</Text>
                <ListIcon
                  ml="auto"
                  fontSize="24px"
                  as={
                    displayChildren[item.text] ? MdArrowDropDown : MdArrowRight
                  }
                  color="gray.500"
                />
              </Box>
            </Button>
          ) : (
            <NextLink href={item.href} passHref>
              <Box
                color={item.href === router.pathname ? "brand.500" : undefined}
                display="flex"
                alignItems="center"
                height="48px"
                as="a"
                p={3}
                width="100%"
              >
                {item.icon && (
                  <ListIcon
                    fontSize="24px"
                    as={item.icon}
                    color={
                      item.href === router.pathname ? "brand.500" : "gray.500"
                    }
                  />
                )}
                <span>{item.text}</span>
              </Box>
            </NextLink>
          )}
          {displayChildren[item.text] && item.children && (
            <SideMenu items={item.children} />
          )}
        </ListItem>
      ))}
    </Styled.NestedList>
  );
};

export default SideMenu;
