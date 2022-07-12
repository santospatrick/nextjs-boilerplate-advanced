import { ChakraStylesConfig, GroupBase } from "chakra-react-select";

const chakraStyles: ChakraStylesConfig<any, boolean, GroupBase<unknown>> = {
  control: (styles) => ({ ...styles, backgroundColor: "#fff" }),
};

export { chakraStyles };
