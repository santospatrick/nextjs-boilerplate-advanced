import InputText from "@/components/inputs/InputText";
import { IconButton, InputGroup, InputRightElement } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdCheck } from "react-icons/md";
import schema from "./schema";

type FormValues = {
  username: string;
};

type Props = {
  onSubmit: SubmitHandler<FormValues>;
  defaultValues: Partial<FormValues>;
  onEscapeKeypress: () => void;
};

function UsernameForm({ onSubmit, defaultValues, onEscapeKeypress }: Props) {
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    function onKeydown(event: any) {
      if (event.key === "Escape") {
        reset(defaultValues);
        onEscapeKeypress();
      }
    }

    window.addEventListener("keydown", onKeydown);

    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [defaultValues, onEscapeKeypress, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup size="md">
        <InputText
          autoFocus
          autoComplete="off"
          type="text"
          name="username"
          control={control}
          helperText="Use 'esc' key to cancel editing"
        />
        <InputRightElement>
          <IconButton
            type="submit"
            aria-label="Submit changes"
            icon={<MdCheck />}
            size="sm"
          />
        </InputRightElement>
      </InputGroup>
    </form>
  );
}

export default UsernameForm;
