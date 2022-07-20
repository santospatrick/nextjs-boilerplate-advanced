import { IconButton, Stack } from "@chakra-ui/react";
import { ReactElement } from "react";
import { MdEdit } from "react-icons/md";

type Props = {
  isEditing: boolean;
  FormComponent: ReactElement;
  defaultValue: string;
  onClickEdit: () => void;
};

const InlineEdit = ({
  isEditing,
  FormComponent,
  defaultValue,
  onClickEdit,
}: Props) => {
  if (isEditing) {
    return FormComponent;
  }
  return (
    <Stack alignItems="center" direction="row">
      <p>{defaultValue}</p>
      <IconButton
        onClick={onClickEdit}
        variant="outline"
        aria-label="Edit table cell"
        icon={<MdEdit />}
        size="sm"
      />
    </Stack>
  );
};

export default InlineEdit;
