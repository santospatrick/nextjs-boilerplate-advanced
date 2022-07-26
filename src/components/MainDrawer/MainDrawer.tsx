import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  HStack,
  IconButton,
  List,
  ListItem,
  Stack,
  Link,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import logo from "@/assets/logo.svg";
import NextLink from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import MenuLink from "./MenuLink";
import { menu } from "./menu";

type Props = Pick<DrawerProps, "onClose" | "isOpen">;

function MainDrawer({ onClose, isOpen }: Props) {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  const [nestedMenuOpen, setNestedMenuOpen] = useState<number | null>(null);

  useEffect(() => {
    onClose();
  }, [router.asPath, onClose]);

  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent maxWidth="240px">
        <DrawerHeader p={0} borderBottomWidth="1px">
          <Stack width="100%" direction="row">
            <IconButton
              onClick={onClose}
              variant="unstyled"
              aria-label="toggle menu visibility"
              icon={<MdMenu />}
              fontSize="20px"
              display="flex"
              justifyContent="center"
              size="lg"
            />
            <Box pr={5} width="100%" display="flex" justifyContent="center">
              <Image src={logo} alt="Logoipsum" />
            </Box>
          </Stack>
        </DrawerHeader>
        <DrawerBody display="flex" flexDirection="column" p={0}>
          <List onClick={onClose}>
            {menu.map((menuItem, menuItemKey) => (
              <ListItem display="flex" flexDirection="column" key={menuItemKey}>
                <MenuLink
                  isOpened={nestedMenuOpen === menuItemKey}
                  onClickDropdown={() => {
                    if (nestedMenuOpen === menuItemKey) {
                      setNestedMenuOpen(null);
                    } else {
                      setNestedMenuOpen(menuItemKey);
                    }
                  }}
                  {...menuItem}
                />
                {nestedMenuOpen === menuItemKey && (
                  <List pl={6}>
                    {menuItem.children &&
                      menuItem.children.map((child, childIndex) => (
                        <ListItem display="flex" key={childIndex}>
                          <MenuLink {...child} />
                        </ListItem>
                      ))}
                  </List>
                )}
              </ListItem>
            ))}
          </List>
          <Box
            onClick={onClose}
            display="flex"
            p={4}
            borderTopWidth="1px"
            mt="auto"
          >
            <HStack spacing={4}>
              <NextLink href="/me" passHref>
                <a>
                  <Avatar size="sm" />
                </a>
              </NextLink>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <NextLink href="/me" passHref>
                  <Link fontSize="xs">{user?.name}</Link>
                </NextLink>
                <Link
                  onClick={(event) => {
                    event.stopPropagation();
                    logout();
                  }}
                  as="button"
                  fontSize="10px"
                  color="brand.600"
                >
                  Logout
                </Link>
              </Box>
            </HStack>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default MainDrawer;
