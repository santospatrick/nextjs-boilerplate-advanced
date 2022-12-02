import { List, Theme } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const NestedList = styled(List)<{ theme?: Theme }>`
  ul {
    padding-left: ${({ theme }) => theme.space[3]};
  }

  a {
    height: 40px;
  }
`;
