import { Button, useBoolean } from "@chakra-ui/react";
import { ComponentMeta } from "@storybook/react";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const Primary = () => {
  const [isOpen, { on, off }] = useBoolean(true);
  const [loading, setLoading] = useState(false);

  const onConfirmDeletion = async () => {
    setLoading(true);
    await sleep(1000);
    setLoading(false);
    off();
  };

  return (
    <>
      <Button onClick={on}>Open confirmation modal</Button>
      <ConfirmDialog
        isOpen={isOpen}
        onClose={off}
        isLoading={loading}
        onConfirm={onConfirmDeletion}
      />
    </>
  );
};

const config = {
  title: "ConfirmDialog",
  component: ConfirmDialog,
} as ComponentMeta<typeof ConfirmDialog>;

export default config;
