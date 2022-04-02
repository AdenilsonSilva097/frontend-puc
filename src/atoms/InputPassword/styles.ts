import styled from "styled-components";

import { windowWidth } from "../../styles/global";

const InputPasswordField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const InputPasswordToggle = styled.span`
  cursor: pointer;
  width: 120px;
  height: 50%;
  line-height: 300%;
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
  text-align: center;
  user-select: none;

  @media (max-width: ${windowWidth.mobile.large}) {
    width: 140px;
    height: 55%;
    line-height: 300%;
  }

  @media (max-width: ${windowWidth.mobile.small}) {
    width: 150px;
  }

`;

export { InputPasswordField, InputPasswordToggle };
