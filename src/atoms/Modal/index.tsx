import React from "react";

import { ModalContainer } from "./styles";

interface ModalProps {
  id: string,
  onClose: () => void,
  overlay: boolean
}

const Modal: React.FC<ModalProps> = ({
  id, onClose, overlay, children
}) => {

  const handleOutsideClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.currentTarget.id === id) onClose();
  };

  return (
    <ModalContainer
      overlay={overlay}
      id={id}
      onClick={(event: any) => handleOutsideClick(event)}
    >
      <div>
        {children}
      </div>
    </ModalContainer>
  );
};

export default Modal;
