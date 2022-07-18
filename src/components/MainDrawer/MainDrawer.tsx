import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Stack,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { MdDashboard, MdMenu, MdPerson } from "react-icons/md";
import logo from "@/assets/logo.svg";
import Link from "next/link";

type Props = Pick<DrawerProps, "onClose" | "isOpen">;

function MainDrawer({ onClose, isOpen }: Props) {
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
        <DrawerBody p={0}>
          <List>
            <ListItem display="flex">
              <Link href="/" passHref>
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
              </Link>
            </ListItem>
            <ListItem display="flex">
              <Link href="/users" passHref>
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
              </Link>
            </ListItem>
          </List>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default MainDrawer;
