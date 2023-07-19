import React from "react";
import { useLogin } from "@/hooks/useLogin";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import LoginForm from "../authentication/login-form";

type Props = {};

function LoginModal({}: Props) {
  const { isOpen, onClose } = useLogin((state) => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
  }));

  return (
    <Modal title={""} description={""} isOpen={isOpen} onClose={onClose}>
      <LoginForm />
    </Modal>
  );
}

export default LoginModal;
