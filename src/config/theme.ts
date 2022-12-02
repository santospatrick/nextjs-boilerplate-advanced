import { extendTheme } from "@chakra-ui/react";
import { sageDark, tealDark, greenDark, redDark } from "@radix-ui/colors";

export const override = {
  colors: {
    sageDark,
    tealDark,
    greenDark,
    redDark,
  },
  components: {
    Button: {
      baseStyle: {
        fontSize: "sm",
        fontWeight: "semibold",
        fontFamily: "Work Sans, sans-serif",
      },
      variants: {
        solid: {
          bg: "tealDark.teal9",
          color: "greenDark.green12",

          _hover: {
            bg: "tealDark.teal10",
          },
        },
        ghost: {
          bg: "sageDark.sage4",
          color: "tealDark.teal9",

          _hover: {
            bg: "sageDark.sage5",
          },
        },
      },
    },

    Tabs: {
      Tab: {
        baseStyle: {
          _checked: {
            bg: "sageDark.sage4",
          },
        },
      },
    },

    Input: {
      baseStyle: {
        fontFamily: "Work Sans, sans-serif",
      },
      variants: {
        outline: {
          field: {
            backgroundColor: "sageDark.sage3",
            color: "sageDark.sage12",
            borderColor: "sageDark.sage7",
          },
        },
      },
    },

    Select: {
      baseStyle: {
        fontFamily: "Work Sans, sans-serif",
      },
      variants: {
        outline: {
          field: {
            backgroundColor: "sageDark.sage3",
            color: "sageDark.sage12",
            borderColor: "sageDark.sage7",
          },
        },
      },
    },
    Tab: {
      baseStyle: {
        backgroundColor: "sageDark.sage3",
      },
    },
    FormLabel: {
      baseStyle: {
        color: "sageDark.sage12",
        fontWeight: "semibold",
        fontSize: "sm",
      },
    },
    Text: {
      baseStyle: {
        letterSpacing: "0.056em",
      },
      variants: {
        heading: {
          fontSize: "xl",
          fontWeight: "medium",
          fontFamily: "'Inter', sans-serif",
        },
      },
    },
    Switch: {
      defaultProps: {
        size: "md",
      },
      baseStyle: {
        track: {
          backgroundColor: "sageDark.sage3",
          border: "2px solid",
          borderColor: "sageDark.sage9",

          _active: {
            backgroundColor: "sageDark.sage3",
            borderColor: "tealDark.teal10",
          },

          _checked: {
            backgroundColor: "sageDark.sage3",
            borderColor: "tealDark.teal10",
          },
        },
        thumb: {
          backgroundColor: "sageDark.sage9",

          _checked: {
            backgroundColor: "tealDark.teal10",
          },
        },
      },
    },
    Checkbox: {
      defaultProps: {
        colorScheme: "teal",
      },
    },
  },
  styles: {
    global: () => ({
      body: {
        bg: "sageDark.sage2",
        color: "sageDark.sage11",
        minWidth: "100%",
        height: "100vh",
      },
    }),
  },
};

export const theme = extendTheme(override);
