import styled from "styled-components";

import { windowWidth } from "../../styles/global";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  padding: 10px 20px;

  :hover {
    background-color: #EBEBEB;

    @media (min-width: ${windowWidth.mobile.large}) {
      cursor: pointer;
    }

  }
`;

export { Container };
