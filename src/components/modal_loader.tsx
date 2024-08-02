"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/modal";
import { Spinner } from "@nextui-org/spinner";
import { useEffect } from "react";

const ModalLoader = (props: { isLoading: boolean }) => {
  const { onOpen, onClose, isOpen, onOpenChange } = useDisclosure();

  /**
   * Handles the logic of opening a loading modal when the props.isLoading
   * is true
   */
  useEffect(() => {
    if (props.isLoading) {
      onOpen();
    }

    if (isOpen && !props.isLoading) {
      onClose();
    }
  }, [props.isLoading]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xs"
      hideCloseButton
    >
      <ModalContent>
        <ModalBody>
          <Spinner className="m-8" size="lg" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalLoader;
