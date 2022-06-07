import { Theme } from "@chakra-ui/react";
import styled from "@emotion/styled";

const getColor = (props: any) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return props.theme.colors.gray[200];
};

export const Container = styled.div<{ theme?: Theme }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: ${(props) => props.theme.radii.md};
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  color: #000;
  outline: none;
  transition: border 0.24s ease-in-out;
`;
