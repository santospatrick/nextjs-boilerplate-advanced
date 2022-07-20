import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";

type Props = Pick<ModalProps, "isOpen" | "onClose"> &
  Pick<ButtonProps, "isLoading"> & {
    onConfirm: () => void;
  };

const ConfirmDialog = ({ isOpen, onClose, onConfirm, isLoading }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm your action</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          This action is irreversable, do you wish to continue?
        </ModalBody>

        <ModalFooter>
          <Button mr={3} variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button isLoading={isLoading} onClick={onConfirm} colorScheme="red">
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDialog;
