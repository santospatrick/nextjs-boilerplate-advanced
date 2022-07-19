import React from "react";
import { Button, useBoolean } from "@chakra-ui/react";
import { ComponentMeta } from "@storybook/react";
import ModalFullscreen from "./ModalFullscreen";

export const RealWorldExample = () => {
  const [isOpen, { off, on }] = useBoolean(true);

  return (
    <>
      <Button onClick={on}>Open modal</Button>
      <ModalFullscreen isOpen={isOpen} onClose={off}>
        You can only click outside to close it if the prop{" "}
        <strong>"closeOnOverlayClick"</strong> is set to <strong>"true"</strong>
      </ModalFullscreen>
    </>
  );
};

const config = {
  title: "Modal Fullscreen",
  component: ModalFullscreen,
} as ComponentMeta<typeof ModalFullscreen>;

export default config;
