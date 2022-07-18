import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useBoolean,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

// Usage
// <ModalFullscreen isOpen={isOpen} onClose={off}>
//   <div>Some content</div>
// </ModalFullscreen>

type Props = Pick<ModalProps, "isOpen" | "onClose"> & {
  children: ReactNode;
  title?: string;
};

function ModalFullscreen({
  isOpen,
  onClose,
  children,
  title = "Modal",
}: Props) {
  const [isFullscreen, { toggle }] = useBoolean();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={isFullscreen ? "full" : "md"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {title}{" "}
          <IconButton
            ml={2}
            aria-label="Toggle modal fullscreen"
            variant="outline"
            size="sm"
            icon={isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
            onClick={toggle}
          />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalFullscreen;
