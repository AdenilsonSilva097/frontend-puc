import styled from "styled-components";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 275px;
  min-width: 275px;
  height: 100vh;
  border-radius: 0px 50px 0px 0px;
  padding-top: 20px;
  background-color: ${(props) => props.theme.colors.primary};
  overflow: hidden;
  transition: all 0.5s;
  z-index: 1;

  >:first-child {
    padding-left: 30px;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid rgb(0,0,0,0.2);

    > :first-child {
      width: 150px;
    }
  }
`;

const SidebarMenusContainer = styled.div`
  flex-grow: 1;
  padding-top: 30px;
  padding-bottom: 15px;
  width: 97%;
  overflow: auto;

  a {
    margin-bottom: 10px;
  }

`;

export { SidebarContainer, SidebarMenusContainer };
