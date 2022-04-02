import styled from "styled-components";
import { windowWidth } from "../../styles/global";

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  @media (max-width: ${windowWidth.mobile.large}) {
    border-radius: 0px;
    padding: 0px;
  }
  
  :hover {
    transform: scale(1.06);
  }

  > :first-child {
    width: 22px;
    height: 22px;

    @media (max-width: ${windowWidth.mobile.large}) {
      width: 25px;
      height: 25px;
    }

  }
`;
