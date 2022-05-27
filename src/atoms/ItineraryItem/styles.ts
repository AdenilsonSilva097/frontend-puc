import styled from "styled-components";

import { windowWidth } from "../../styles/global";

export const Container = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #E6ECED;
  padding: 15px;
  width: 100%;
  border-radius: 10px;
  gap: 10px;
`;

export const Title = styled.div`
  color: ${(props) => props.theme.colors.label};
  font-size: 12px;
`;

export const Description = styled.div`
  color: ${(props) => props.theme.colors.text};
  font-size: 14px;
  font-weight: 450;

  @media (max-width: ${windowWidth.mobile.large}) {
    font-size: 16px;
  }
`;

export const Index = styled.div`
  font-size: 25px;
  font-weight: 450;
`;

export const Infos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;
