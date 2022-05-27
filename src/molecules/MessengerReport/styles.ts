import styled from "styled-components";

import { windowWidth } from "../../styles/global";

import { Fab } from "../../libraries/mui/components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 15px;
  padding-top: 0;
  width: 100%;
  border-radius: 10px;
`;

export const Title = styled.div`
  color: ${(props) => props.theme.colors.label};
  font-size: 12px;
  line-height: 12px;
  padding-top: 15px;
`;

export const Description = styled.div`
  color: ${(props) => props.theme.colors.text};
  font-size: 14px;
  font-weight: 450;
  border-bottom: 0.5px solid #CACACA;
  width: 100%;
  font-weight: bold;

  @media (max-width: ${windowWidth.mobile.large}) {
    font-size: 16px;
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

  @media print {
    display: none !important;
  }

`;
