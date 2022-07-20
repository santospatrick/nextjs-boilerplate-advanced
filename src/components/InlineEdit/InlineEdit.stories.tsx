import { Box, useBoolean } from "@chakra-ui/react";
import { ComponentMeta } from "@storybook/react";
import { useState } from "react";
import UsernameForm from "../forms/UsernameForm";
import InlineEdit from "./InlineEdit";

export const Primary = () => {
  const [isEditing, { on, off }] = useBoolean();
  const [form, setForm] = useState({ username: "santospatrick" });

  return (
    <>
      <InlineEdit
        isEditing={isEditing}
        onClickEdit={on}
        defaultValue={form.username}
        FormComponent={
          <UsernameForm
            onSubmit={(values) => {
              setForm(values);
              off();
            }}
            defaultValues={form}
            onEscapeKeypress={() => {
              off();
            }}
          />
        }
      />
      <Box mt={8}>
        <pre>form: {JSON.stringify(form, null, 2)}</pre>
      </Box>
    </>
  );
};

const config = {
  title: "Inline Edit",
  component: InlineEdit,
} as ComponentMeta<typeof InlineEdit>;

export default config;
