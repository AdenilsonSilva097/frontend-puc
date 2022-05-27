import styled from "styled-components";

import { windowWidth } from "../../styles/global";

import { Fab } from "../../libraries/mui/components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px;
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

  @media print {
    display: none !important;
  }

`;
