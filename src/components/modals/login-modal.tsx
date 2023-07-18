import React from "react";
import { useLogin } from "@/hooks/useLogin";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";

type Props = {};

function LoginModal({}: Props) {
  const { isOpen, onClose } = useLogin((state) => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
  }));

  return (
    <Modal
      title={"This is the title"}
      description={"This is the description"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form>
        <Input placeholder="email" />
      </form>
    </Modal>
  );
}

export default LoginModal;
