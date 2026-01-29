import { useState } from "react";

export default function useToast() {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("info");

  const showToast = (message, severity = "success") => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToastOpen(true);
  };

  const closeToast = () => setToastOpen(false);

  return {
    toastOpen,
    toastMessage,
    toastSeverity,
    showToast,
    closeToast,
  };
}
