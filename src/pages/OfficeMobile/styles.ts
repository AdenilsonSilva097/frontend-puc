import styled from "styled-components";

const OfficeMobileContainer = styled.div`
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.primary};
`;

const OfficeMobileContentArea = styled.div`
  margin-top: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
`;

const OfficeMobileContentContainer = styled.div`
  flex-grow: 1;
  z-index: 1;
`;

export { OfficeMobileContainer, OfficeMobileContentArea, OfficeMobileContentContainer };
