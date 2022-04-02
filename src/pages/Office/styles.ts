import styled from "styled-components";

const OfficeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const OfficeContentArea = styled.div`
  flex-grow: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

const OfficeContentContainer = styled.div`
  flex-grow: 1;
  background-color: ${(props) => props.theme.colors.backgroundContent};
  padding-left: 35px;
  padding-right: 25px;
  padding-top: 25px;
  padding-bottom: 25px;
`;

export { OfficeContainer, OfficeContentArea, OfficeContentContainer };
