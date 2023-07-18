import toast from "react-hot-toast";

interface customToastProps {
  types: "info" | "error" | "success";
  message: string;
}

export const notify = ({ types, message }: customToastProps) => {
  if (types === "error") {
    return toast.error(message);
  }
  if (types === "success") {
    return toast.success(message);
  } else {
    return toast(message);
  }
};
