import styled from "styled-components";

import { Dialog, DialogTitle } from "../../libraries/mui/components";

const DialogContainer = styled(Dialog)`
  .MuiDialog-paper {
    height: 100% !important;
    margin: 10px !Important;
    padding: 10px !important;
    border-radius: 10px !important;
  }
`;

const DialogContainerTitle = styled(DialogTitle)`
  &.MuiDialogTitle-root {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px !important;
    padding-bottom: 10px !important;
    font-size: 29px !important;
  }
`;

export { DialogContainer, DialogContainerTitle };
