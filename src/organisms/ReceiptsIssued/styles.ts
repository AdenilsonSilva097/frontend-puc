import styled from "styled-components";
import { windowWidth } from "../../styles/global";

import { Dialog, Fab } from "../../libraries/mui/components";

interface IStatusProps {
  status: string;
}

export const FabPrint = styled(Fab)`
  position: fixed !important;
  right: 20px !important;
  bottom: 20px !important;
  background-color: ${(props) => props.theme.colors.primary} !important;

  svg {
    fill: white;
  }

  @media (max-width: ${windowWidth.mobile.large}) {
    right: 100px !important;
    bottom: 10px !important;
    background-color: ${(props) => props.theme.colors.secondary} !important;
  }

  @media print {
    display: none !important;
  }

`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  position: absolute;
  padding-top: 10px;

  > :first-child {
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
  }

  .MuiTableContainer-root {
    height: 100%;
    width: 100%;
    padding-bottom: 70px;

    .MuiTableCell-root {
      padding: 7.5px;
    }

    tr {
      > :last-child {
        @media print {
          display: none;
        }
      }
    }
  }

  > * {
    @media ( max-width: ${windowWidth.mobile.large} ) {
      ::-webkit-scrollbar {
        width: 2px;
      }
    }
  }
`;

export const DialogContainer = styled(Dialog)`

  .MuiDialog-paper {
    padding: 20px !important;
    border-radius: 10px !important;
  }

  > * {
    > .MuiPaper-root {
      height: 100% !important;
      width: 100% !important;
    }
  }
`;

export const FabContainer = styled(Fab)`
  position: fixed !important;
  right: 20px !important;
  bottom: 20px !important;
  width: 80px !important;
  height: 80px !important;
  background-color: ${(props) => props.theme.colors.primary} !important;

  svg {
    fill: white;
  }

  @media (max-width: ${windowWidth.mobile.large}) {
    right: 10px !important;
    bottom: 10px !important;
    background-color: ${(props) => props.theme.colors.secondary} !important;
  }
`;

export const Status = styled.span<IStatusProps>`
  color: white;

  ${(props) => {
    switch (props.status) {
      case "EMITIDA":
        return `
          background-color: ${props.theme.colors.primary} !important;
        `;
      case "RECEBIDA":
        return `
          background-color: ${props.theme.colors.secondary} !important;
        `;
      case "REMARCAR":
        return `
          background-color: #CACACA !important;
        `;
      default:
        return `
          background-color: ${props.theme.colors.background} !important;
        `;
    }
  }}

  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 5px;
  padding: 5px; 
  font-weight: bold;
`;
