import { IconButton, Stack } from "@chakra-ui/react";
import { ReactElement } from "react";
import { MdEdit } from "react-icons/md";

type Props = {
  isEditing: boolean;
  FormComponent: ReactElement;
  value: string;
  onClickEdit: () => void;
};

const InlineEdit = ({
  isEditing,
  FormComponent,
  value,
  onClickEdit,
}: Props) => {
  if (isEditing) {
    return FormComponent;
  }
  return (
    <Stack alignItems="center" direction="row">
      <p>{value}</p>
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
