import { Box, IconButton, Stack } from "@chakra-ui/react";
import Image from "next/image";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import logo from "@/assets/logo.svg";
import { MdMenu } from "react-icons/md";
import MainDrawer from "@/components/MainDrawer";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

type Props = {
  children: ReactNode;
  title?: string;
};

function PrivatePage({ children, title = "" }: Props) {
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div>
      <Box display="flex" alignItems="center" height="48px" bgColor="#fff">
        <Box
          display="flex"
          alignItems="center"
          borderRight="1px solid"
          borderColor="gray.200"
          height="inherit"
          maxWidth="240px"
          width="100%"
        >
          <Stack width="100%" direction="row">
            <IconButton
              onClick={() => setOpen(true)}
              variant="unstyled"
              aria-label="toggle menu visibility"
              icon={<MdMenu />}
              fontSize="20px"
              display="flex"
              justifyContent="center"
              size="lg"
            />
            <Box pr={5} width="100%" display="flex" justifyContent="center">
              <Link href="/" passHref>
                <Box as="a" display="flex" alignItems="center">
                  <Image src={logo} alt="Logoipsum" />
                </Box>
              </Link>
            </Box>
          </Stack>
        </Box>
        <Box pl={5}>{title}</Box>
      </Box>
      <MainDrawer isOpen={open} onClose={onClose} />
      <Box width="100%" display="flex">
        {children}
      </Box>
    </div>
  );
}

const withAuth = (Component: typeof PrivatePage) => {
  const AuthenticatedComponent = (props: Props) => {
    const router = useRouter();
    const { user, isLoading } = useAuth();
    const [renderPage, setRenderPage] = useState(false);

    useEffect(() => {
      if (isLoading) return;

      if (!user?.id) {
        router.replace("/login");
        return;
      }

      setRenderPage(true);
    }, [router, user, isLoading]);

    return renderPage ? <Component {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth(PrivatePage);
