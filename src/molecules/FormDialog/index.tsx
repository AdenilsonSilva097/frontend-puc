import React from "react";
import { Close } from "../../libraries/mui/icons";
import { IconButton } from "../../libraries/mui/components";

import * as Styled from "./styles";

interface IFormDialog {
  title: string;
  open: boolean;
  onClose: () => void;
}

const FormDialog: React.FC<IFormDialog> = ({
  title, open, onClose, children
}) => (
  <Styled.DialogContainer open={open}>
    <Styled.DialogContainerTitle>
      {title}
      <IconButton onClick={onClose}>
        <Close fontSize="large" />
      </IconButton>
    </Styled.DialogContainerTitle>
    {children}
  </Styled.DialogContainer>
);

export default FormDialog;
