import { useState } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/config/theme";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import NProgress from "next-nprogress/component";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <DefaultSeo {...SEO} />
      <ToastContainer />
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
              <NProgress />
              <ReactQueryDevtools initialIsOpen={false} />
            </Hydrate>
          </QueryClientProvider>
        </ChakraProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
