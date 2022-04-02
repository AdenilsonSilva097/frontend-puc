import styled from "styled-components";

import { windowWidth } from "../../styles/global";

const DashboardContainer = styled.div`
  
`;

const DashboardTitle = styled.div`
  font-weight: 500;
  font-size: 22px;
  padding-bottom: 15px;
  user-select: none;

  @media (max-width: ${windowWidth.tablet}) {
    color: white;
  }

`;

const DashboardContent = styled.div`
  padding-top: 25px;

  @media (max-width: ${windowWidth.tablet}) {
    color: white;
  }

`;

export { DashboardContainer, DashboardTitle, DashboardContent };
