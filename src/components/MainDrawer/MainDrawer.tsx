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
  ListIcon,
  ListItem,
  Stack,
  Link,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { MdDashboard, MdMenu, MdPerson } from "react-icons/md";
import logo from "@/assets/logo.svg";
import NextLink from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

type Props = Pick<DrawerProps, "onClose" | "isOpen">;

function MainDrawer({ onClose, isOpen }: Props) {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

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
          <List>
            <ListItem display="flex">
              <NextLink href="/" passHref>
                <Box
                  display="flex"
                  alignItems="center"
                  height="48px"
                  as="a"
                  p={3}
                  width="100%"
                >
                  <ListIcon fontSize="24px" as={MdDashboard} color="gray.500" />
                  <span>Dashboard</span>
                </Box>
              </NextLink>
            </ListItem>
            <ListItem display="flex">
              <NextLink href="/users" passHref>
                <Box
                  display="flex"
                  alignItems="center"
                  height="48px"
                  as="a"
                  p={3}
                  width="100%"
                >
                  <ListIcon fontSize="24px" as={MdPerson} color="gray.500" />
                  <span>Usuários</span>
                </Box>
              </NextLink>
            </ListItem>
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
                  <Link fontSize="xs">{user?.username}</Link>
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
