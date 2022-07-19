import { extendTheme } from "@chakra-ui/react";

export const override = {
  colors: {
    brand: {
      50: "#e7f6fd", // hover
      500: "#478ad2", // button background color
      600: "#2a69ac", // active
    },
  },
};

export const theme = extendTheme(override);
