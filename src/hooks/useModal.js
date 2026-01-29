import { useState } from "react";

export default function useModal() {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(null);

  const openModal = (id) => {
    setProductId(id);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setProductId(null);
  };

  return { open, productId, openModal, closeModal };
}
