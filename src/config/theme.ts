import { extendTheme } from "@chakra-ui/react";
import { GlobalStyleProps, mode } from "@chakra-ui/theme-tools";

export const override = {
  colors: {
    brand: {
      50: "#e7f6fd", // hover
      500: "#478ad2", // button background color, menu link color
      600: "#2a69ac", // active
    },
  },
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            backgroundColor: "#fff",
          },
        },
      },
    },
  },
  styles: {
    global: (props: GlobalStyleProps) => ({
      body: {
        bg: mode("#edf5ff", "gray.800")(props),
      },
    }),
  },
};

export const theme = extendTheme(override);
